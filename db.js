const spicedPg = require("spiced-pg");
var db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/socialnetwork"
);
// Register a new user.
module.exports.addNewUser = (first, last, email, password) => {
    return db.query(
        `INSERT INTO users (first, last, email, password) 
        VALUES ($1, $2, $3, $4) RETURNING id;`,
        [first, last, email, password]
    );
};
// Verify a user is already registered.
module.exports.verify = (email) => {
    return db.query(`SELECT * FROM users WHERE email = $1;`, [email]);
};

// Add reset password code.
module.exports.addResetCode = (email, code) => {
    return db.query(
        `INSERT INTO reset_codes(email, code) 
        VALUES ($1, $2);`,
        [email, code]
    );
};
