const { readPasswords, writePasswords, writeDB } = require("./passwords");
const { hashPassword, encrypt, decrypt } = require("./crypto");

function get(key) {
  console.log("Called GET", key);
  try {
    const passwords = readPasswords();
    const encryptedPassword = passwords[key];
    const password = decrypt(encryptedPassword);
    console.log(`${key}: ${password}`);
  } catch (error) {
    console.error(error);
  }
}
function set(key, value) {
  console.log("Called SET", key, value);
  // Read db.json
  const encryptedValue = encrypt(value);
  try {
    const passwords = readPasswords();
    // Update value by key
    passwords[key] = encryptedValue;
    // Write db.json
    writePasswords(passwords);
  } catch (error) {
    console.log(error);
  }
}

function unset(key) {
  console.log("Called UNSET", key);
  try {
    const passwords = readPasswords();
    delete passwords[key];
    writePasswords(passwords);
  } catch (error) {
    console.log(error);
  }
}

function reset(masterPassword) {
  const db = {
    masterPassword: hashPassword(masterPassword),
    passwords: {},
  };
  writeDB(db);
  console.log("Reset database with new master password");
}

exports.get = get;
exports.set = set;
exports.unset = unset;
exports.reset = reset;
