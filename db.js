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

// Get the most recent reset code associated with the given address.
module.exports.verifyResetCode = (email) => {
    return db.query(
        `SELECT * FROM reset_codes 
        WHERE (CURRENT_TIMESTAMP - timestamp < INTERVAL '10 minutes') 
        AND (email = $1) ORDER BY id DESC LIMIT 1;`,
        [email]
    );
};

// Update password upon verification of the reset code.
module.exports.updatePassword = (email, password) => {
    return db.query(
        `
    UPDATE users 
    SET password = $2 
    WHERE email = $1;`,
        [email, password]
    );
};

// Update password upon verification of the reset code.
module.exports.getUserInfo = (id) => {
    return db.query(
        `
    SELECT * 
    FROM users 
    WHERE id = $1;`,
        [id]
    );
};

module.exports.addUserPhoto = (id, image_url) => {
    return db.query(
        `
    UPDATE users 
    SET image_url = $2 
    WHERE id = $1;`,
        [id, image_url]
    );
};

module.exports.addUserBio = (id, bioText) => {
    return db.query(
        `
    UPDATE users 
    SET bio = $2 
    WHERE id = $1
    RETURNING bio, id;`,
        [id, bioText]
    );
};

module.exports.getAllUserIds = () => {
    return db.query(
        `SELECT id 
        FROM users;
    `
    );
};

module.exports.getRecentUsers = (id) => {
    return db.query(
        `SELECT * FROM users 
        WHERE id != $1
        ORDER BY id DESC 
        LIMIT 9;
    `,
        [id]
    );
};

module.exports.getMatchingUsers = (val) => {
    return db.query(
        `SELECT * FROM users 
        WHERE first 
        ILIKE $1;`,
        [val + "%"]
    );
};
module.exports.getFriendStatus = (receiver_id, sender_id) => {
    return db.query(
        `SELECT * FROM friendships 
        WHERE (receiver_id = $1 AND sender_id = $2)
        OR (receiver_id = $2 AND sender_id = $1);`,
        [receiver_id, sender_id]
    );
};

module.exports.sendFriendRequest = (receiver_id, sender_id) => {
    return db.query(
        `INSERT INTO friendships (receiver_id, sender_id) 
        VALUES ($1, $2) RETURNING *;`,
        [receiver_id, sender_id]
    );
};

module.exports.acceptFriend = (receiver_id, sender_id) => {
    return db.query(
        `UPDATE friendships SET accepted = TRUE 
        WHERE (receiver_id = $1 AND sender_id = $2) 
        OR (receiver_id = $2 AND sender_id = $1);`,
        [receiver_id, sender_id]
    );
};

module.exports.unfriend = (receiver_id, sender_id) => {
    return db.query(
        `DELETE FROM friendships WHERE 
        (receiver_id = $1 AND sender_id = $2) 
        OR (receiver_id = $2 AND sender_id = $1);`,
        [receiver_id, sender_id]
    );
};

module.exports.getWantToBeFriends = (id) => {
    return db.query(
        `
      SELECT users.id, first, last, image_url, accepted
      FROM friendships
      JOIN users
      ON (accepted = false AND receiver_id = $1 AND sender_id = users.id)
      OR (accepted = true AND receiver_id = $1 AND sender_id = users.id)
      OR (accepted = true AND sender_id = $1 AND receiver_id = users.id)
  `,
        [id]
    );
};

module.exports.getRecentPublicChat = () => {
    return db.query(`
    SELECT messages.created_at, messages.sender_id, 
    messages.chat_message, users.id, users.first, users.last,
    users.image_url 
    FROM messages
    JOIN users
    ON (sender_id = users.id)
    `);
};

module.exports.addNewPublicMessage = (id, chat_message) => {
    return db.query(
        `INSERT INTO messages (sender_id, chat_message) 
        VALUES ($1, $2)
        RETURNING * 
        `,
        [id, chat_message]
    );
};
module.exports.deleteUser = (id) => {
    return db.query(
        `DELETE FROM users 
        WHERE id = $1  
        `,
        [id]
    );
};
module.exports.deleteFriendships = (id) => {
    return db.query(
        `DELETE FROM friendships 
        WHERE sender_id = $1 
        OR receiver_id = $1  
        `,
        [id]
    );
};
module.exports.deleteMessages = (id) => {
    return db.query(
        `DELETE FROM messages 
        WHERE sender_id = $1  
        `,
        [id]
    );
};
