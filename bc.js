let { genSalt, hash, compare } = require("bcryptjs");
const { promisify } = require("util");

// GENERATES SALT (I.E. A RANDOM STRING).
genSalt = promisify(genSalt);
// TAKES TWO ARGS: PLAIN-TEXT AND SALT.
hash = promisify(hash);
// RETURNS BOOLEAN...IF TWO ARGS (PLAIN-TEXT AND HASH) VALUE MATCH.
compare = promisify(compare);

//HASHES PASSWORD.
module.exports.hash = (plainText) =>
    genSalt().then((salt) => hash(plainText, salt));
//COMPARES PLAIN-TEXT AND HASHED PASSWORD.
module.exports.compare = compare;
