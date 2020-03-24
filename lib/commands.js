const { readPasswords, writePasswords } = require("./passwords");

function get(); {
    console.log("Called GET", key);
    // Read key from db.json
    try {
      const passwords = readPasswords();
      console.log(key, passwords[key]);
    } catch (error) {
      console.error(error);
    }
  }
  function set() {
    console.log("Called SET", key, value);
    // Read db.json
    try {
      const passwords = readPasswords();
      // Update value by key
      passwords[key] = value;
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
