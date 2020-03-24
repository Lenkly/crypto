const { readPasswords, writePasswords } = require("./passwords");
const { encrypt, decrypt } = require("./crypto");

function get(); {
    console.log("Called GET", key);
    // Read key from db.json
    try {
      const passwords = readPasswords();
      const encryptedPassword = passwords[key];
              const password = decrypt(encryptedPassword);
      console.log(`${key}: ${password}`);
    } catch (error) {
      console.error(error);
    }
  }
  function set() {
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
  
  function unset() {
    console.log("Called UNSET", key);
    try {
      const passwords = readPasswords();
      delete passwords[key];
      writePasswords(passwords);
    } catch (error) {
      console.log(error);
    }
  }

exports.get = get;
exports.set = set;
exports.unset = unset;
