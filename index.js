const express = require("express");
const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server, {
    origins: "localhost:8080 https://the-pig-pen.herokuapp.com/",
});
const compression = require("compression");
const cookieSession = require("cookie-session");
const db = require("./db");
const { hash, compare } = require("./bc");
const csurf = require("csurf");
const { sendEmail } = require("./ses");
const cryptoRandomString = require("crypto-random-string");
const s3 = require("./s3");

// ================ MIDDLEWARE  ================ //
app.use(compression());
app.use(express.json());
app.use(express.static("./public"));

const cookieSessionMiddleware = cookieSession({
    secret: `I'm always hungry.`,
    maxAge: 1000 * 60 * 60 * 24 * 90,
});

// Ensure cookie UserId information is still available with sockets
app.use(cookieSessionMiddleware);
io.use(function (socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

app.use(csurf());

app.use((req, res, next) => {
    res.cookie("mytoken", req.csrfToken());
    next();
});

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/",
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

//------------------ IMAGE UPLOAD BOILERPLATE-------------------//
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 5097152,
    },
});
// ================ ROUTES  ================ //

// If a user, redirect to homepage, else, serve welcome.
app.get("/welcome", (req, res) => {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(`${__dirname}/index.html`);
    }
});

// Registration post route.
app.post("/register", (req, res) => {
    let { first, last, email, password } = req.body;
    if (first && last && email && password) {
        hash(password)
            .then((hashedPW) => db.addNewUser(first, last, email, hashedPW))
            .then(({ rows }) => {
                req.session.userId = rows[0].id;
                res.json({ success: true });
            })
            .catch((err) => {
                console.log("error in account register post request: ", err);
            });
    } else {
        res.json({ success: false });
    }
});

//Login post route.
app.post("/login", (req, res) => {
    let id;
    let { email, password } = req.body;
    db.verify(email)
        .then(({ rows }) => {
            id = rows[0].id;
            return compare(password, rows[0].password);
        })
        .then((matchValue) => {
            if (matchValue) {
                req.session.userId = id;
                res.json({ success: true });
            }
        })
        .catch((err) => {
            console.log("Error in login post request: ", err);
            res.json({ success: false });
        });
});

// Guest user route for portfolio viewers.

app.get("/guest-user", (req, res) => {
    req.session.userId = Math.floor(Math.random() * 110) + 1;
    res.json({ success: true });
});

// Begin the  password reset route.
app.post("/reset/start", (req, res) => {
    let resetCode;
    let { email } = req.body;
    db.verify(email)
        .then(({ rows }) => {
            resetCode = cryptoRandomString({ length: 6 });
            email = rows[0].email;
            db.addResetCode(email, resetCode)
                .then(() =>
                    sendEmail(
                        email,
                        `Your reset code is ${resetCode}. It expires in 10 minutes.`,
                        "BookFace Reset Code"
                    ).then(() => res.json({ success: true }))
                )
                .catch((err) => {
                    console.log("Error in db.addResetCode: ", err);
                    res.json({ success: false });
                });
        })
        .catch((err) => {
            console.log("error in email verification: ", err);
            res.json({ noEmailFound: true });
        });
});

// Verify authenticity of given reset code.
app.post("/reset/verify", (req, res) => {
    let { email, resetCode, newPassword } = req.body;
    db.verifyResetCode(email)
        .then(({ rows }) => {
            if (resetCode == rows[0].code) {
                hash(newPassword).then((hashedPW) => {
                    db.updatePassword(email, hashedPW)
                        .then(() => res.json({ success: true }))
                        .catch((err) =>
                            console.log("error in db.updated password: ", err)
                        );
                });
            } else {
                res.json({ codeError: true });
            }
        })
        .catch((err) => {
            console.log("error in db.verifyResetCode verification :", err);
        });
});

// Get logged in user information.
app.get("/user", (req, res) => {
    db.getUserInfo(req.session.userId).then(({ rows }) => res.json(rows[0]));
});

// If search parameter, get most corresponding users, else, get most recent users.
app.get("/api/users/:search", async (req, res) => {
    const query = req.params.search;
    if (query == "noSearch") {
        try {
            const result = await db.getRecentUsers(req.session.userId);
            res.json(result);
        } catch (err) {
            console.log("Error in get recent users app.get request: ", err);
        }
    } else {
        try {
            const result = await db.getMatchingUsers(query);
            res.json(result);
        } catch (err) {
            console.log("Error in get matching users app.get request: ", err);
        }
    }
});

// Get other user information and id of logged in user.
app.get("/api/user/:id", (req, res) => {
    db.getAllUserIds().then(({ rows }) => {
        // Get all user Ids to send 4o4 if user not found.
        const allIds = rows.map(({ id }) => id);
        if (allIds.includes(parseInt(req.params.id))) {
            db.getUserInfo(req.params.id).then(({ rows }) => {
                const profileData = rows[0];
                // Add loggedIn userId to response to prevent from seeing own profile
                profileData.loggedInUserId = req.session.userId;
                res.json(profileData);
            });
        } else {
            res.json({ userNotFound: true });
        }
    });
});

// Upload new user picture.
app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    req.body.image_url = `https://s3.amazonaws.com/spicedling/${req.file.filename}`;
    if (req.file) {
        db.addUserPhoto(req.session.userId, req.body.image_url).then(() =>
            res.json(req.body)
        );
    } else {
        // If no file is found upon request.
        res.sendStatus(500);
    }
});

// Save user bio.
app.post("/save-bio", (req, res) => {
    db.addUserBio(req.session.userId, req.body.draftBio).then(() =>
        res.json({ success: true, newBio: req.body.draftBio })
    );
});

//  Get the current friend status between two users, and send correspond text back to component button.
app.get("/api/friend-status/:id", async (req, res) => {
    const otherId = req.params.id;
    const loggedUserId = req.session.userId;
    const { rows } = await db.getFriendStatus(otherId, loggedUserId);
    // No relation between the users in database, so give option to send.
    if (!rows.length) {
        res.json({ text: "Send Friend Request" });
        // If sender is other user and not accepted, show accept friend request.
    } else if (rows[0].sender_id == otherId && !rows[0].accepted) {
        res.json({ text: "Accept Friend Request" });
        // If sender is loggedIn user and no accepted, show cancel friend request.
    } else if (rows[0].receiver_id == otherId && !rows[0].accepted) {
        res.json({ text: "Cancel Friend Request" });
        // Otherwise give option to unfriend for both friended users.
    } else {
        res.json({ text: "Unfriend" });
    }
});

// Post request which is triggered when friend button is pushed in otherprofile component.
app.post("/api/friendship/:id", (req, res) => {
    const otherId = req.params.id;
    const loggedUserId = req.session.userId;
    const { text } = req.body;
    // If option to send request is available, make database entry and display cancel friend button.
    if (text == "Send Friend Request") {
        return db
            .sendFriendRequest(otherId, loggedUserId)
            .then(() => res.json({ text: "Cancel Friend Request" }))
            .catch((err) => {
                console.log("Error in api/friendship sendFriendRequest: ", err);
            });
        // If option to accept request then make db entry to set accepted to true, and display unfriend button.
    } else if (text == "Accept Friend Request") {
        return db
            .acceptFriend(otherId, loggedUserId)
            .then(() => res.json({ text: "Unfriend", otherId: otherId }))
            .catch((err) => {
                console.log("Error in api/friendship acceptFriend: ", err);
            });
        // In case of cancel request, decline request or unfriend change back to send friend request.
    } else {
        return db
            .unfriend(otherId, loggedUserId)
            .then(() => {
                res.json({ text: "Send Friend Request", otherId: otherId });
            })
            .catch((err) => {
                console.log("Error in api/friendship .unfriend: ", err);
            });
    }
});

app.get("/want-to-be-friends", async (req, res) => {
    try {
        const { rows } = await db.getWantToBeFriends(req.session.userId);
        res.json(rows);
    } catch (err) {
        console.log("error in app get want to be friends: ", err);
    }
});

// DELETE ACCOUNT FUNCTIONALITY
app.get("/delete-account", (req, res) => {
    const { userId } = req.session;
    try {
        db.deleteFriendships(userId).then(() => {
            db.deleteUser(userId).then(() => {
                db.deleteMessages(userId).then(() => {
                    res.json({ success: true });
                });
            });
        });
    } catch (err) {
        console.log("error in app get delete account :>> ", err);
    }
});

//Logout functionality.
app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/login");
});

// If not a user, direct to welcome, else, serve homepage.
app.get("*", (req, res) => {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(`${__dirname}/index.html`);
    }
});

// Using server instead of app for socket.io integration.
server.listen(process.env.PORT || 8080, () => {
    console.log("the server is listening on 8080");
});

// ======================== CHAT FUNCTIONALITY =====================

// Route for chat functionality.
io.on("connection", (socket) => {
    if (!socket.request.session.userId) {
        return socket.disconnect(true);
    }

    const userId = parseInt(socket.request.session.userId);

    db.getRecentPublicChat().then(({ rows }) => {
        socket.emit("recentPublicChat", rows);
    });

    socket.on("newPublicChatMessage", (newPublicMsg) => {
        // Add the public message, then get userInfo for the sender
        db.addNewPublicMessage(userId, newPublicMsg).then(({ rows }) => {
            const senderId = rows[0].sender_id;
            const timestamp = rows[0].created_at;
            db.getUserInfo(senderId).then(({ rows }) => {
                io.sockets.emit("addPublicChatMessage", {
                    ...rows[0],
                    chat_message: newPublicMsg,
                    created_at: timestamp,
                });
            });
        });
    });
});
