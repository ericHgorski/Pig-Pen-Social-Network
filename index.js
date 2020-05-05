const express = require("express");
const app = express();
const compression = require("compression");
const coookieSession = require("cookie-session");
const db = require("./db");
const { hash, compare } = require("./bc");
const csurf = require("csurf");
const { sendEmail } = require("./ses");
const cryptoRandomString = require("crypto-random-string");

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

app.use(function (req, res, next) {
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
// ================ ROUTES  ================ //

// If a user, redirect to homepage, else, serve welcome.
app.get("/welcome", function (req, res) {
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

// If not a user, direct to welcome, else, serve homepage.
app.get("*", function (req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(`${__dirname}/index.html`);
    }
});

app.listen(8080, function () {
    console.log("I'm listening.");
});

// // First password reset route -- EXTENDED VERSION.
// // app.post("/reset/start", (req, res) => {
// //     let resetCode;
// //     let { email } = req.body;
// //     db.verify(email)
// //         .then(({ rows }) => {
// //             resetCode = cryptoRandomString({
// //                 length: 6,
// //             });
// //             db.addResetCode(email, resetCode)
// //                 .then(({ rows }) => {
// //                     sendEmail(
// //                         email,
// //                         `Your reset code is ${resetCode}. It expires in 10 minutes.`,
// //                         "BookFace Reset Code"
// //                     )
// //                         .then(() => {
// //                             res.json({ success: true });
// //                         })
// //                         .catch((err) => {
// //                             console.log("Error in ses.sendEmail: ", err);
// //                             res.json({ success: false });
// //                         });
// //                 })
// //                 .catch((err) => {
// //                     console.log("Error in db.addCode: ", err);
// //                     res.json({ success: false });
// //                 });
// //         })
// //         .catch((err) => {
// //             console.log("Error in db.login: ", err);
// //             res.json({ noEmailFound: true });
// //         });
// // });
