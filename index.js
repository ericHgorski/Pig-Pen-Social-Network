const express = require("express");
const app = express();
const compression = require("compression");
const coookieSession = require("cookie-session");
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
app.use(
    coookieSession({
        secret: "I'm always hungry",
        maxAge: 1000 * 60 * 60 * 24 * 14,
    })
);

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
app.get("/api/users/:user", async (req, res) => {
    if (req.params.user == "recentUsers") {
        try {
            const result = await db.getRecentUsers();
            res.json(result);
        } catch (err) {
            console.log("Error in get recent users app.get request: ", err);
        }
    } else {
        try {
            const result = await db.getMatchingUsers(req.params.user);
            res.json(result);
        } catch (err) {
            console.log("Error in get matching users app.get request: ", err);
        }
    }
});

// Get other user information and id of logged in user.
app.get("/api/user/:id", (req, res) => {
    db.getAllUserIds().then(({ rows }) => {
        // get all user Ids to send 4o4 if user not found.
        const allIds = rows.map(({ id }) => id);
        if (allIds.includes(parseInt(req.params.id))) {
            db.getUserInfo(req.params.id).then(({ rows }) => {
                const profileData = rows[0];
                // add loggedIn userId to prevent from seeing own profile
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
    if (req.body.draftBio) {
        db.addUserBio(req.session.userId, req.body.draftBio).then(() =>
            res.json({ success: true })
        );
    } else {
        res.json({ bioError: true });
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

app.listen(8080, () => {
    console.log("I'm listening.");
});
