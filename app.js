const fs = require("fs");

const [command, key, value] = process.argv.slice(2);

function get() {
  console.log("Called GET", key);
  // Read key from db.json
  try {
    const passwordsJSON = fs.readFileSync("./db.json", "utf8");
    const passwords = JSON.parse(passwordsJSON);
    console.log(key, passwords[key]);
  } catch (error) {
    console.error(error);
  }
}
function set() {
  console.log("Called SET", key, value);
  // Read db.json
  try {
    const passwordsJSON = fs.readFileSync("./db.json", "utf8");
    const passwords = JSON.parse(passwordsJSON);
    // Update value by key
    passwords[key] = value;
    // Write db.json
    fs.writeFileSync("./db.json", JSON.stringify(passwords, null, 2));
  } catch (error) {
    console.log(error);
  }
}

function unset() {
  console.log("Called UNSET", key);
  try {
    const passwordsJSON = fs.readFileSync("./db.json", "utf8");
    const passwords = JSON.parse(passwordsJSON);
    delete passwords[key];
    fs.writeFileSync("./db.json", JSON.stringify(passwords, null, 2));
  } catch (error) {
    console.log(error);
  }
}

if (command === "get") {
  get();
} else if (command === "set") {
  set();
} else {
  unset();
}
