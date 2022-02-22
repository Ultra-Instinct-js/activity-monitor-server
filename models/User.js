const { init } = require("../dbConfig");

class User {
  constructor(data) {
    this.username = data.username;
    this.email = data.email;
    this.hash = data.hash;
  }

  //get all for testing purposes
  static get all() {
    return new Promise(async (res, rej) => {
      try {
        const db = await init();
        let result = db.collection("users").find().toArray();
        let users = result.map((u) => {
          new User(u);
        });
        res(users);
      } catch (err) {
        rej(`Error retrieving users: ${err}`);
      }
    });
  }

  static create(username, email, password) {
    return new Promise(async (res, rej) => {
      try {
        console.log("connecting to db");
        const db = await init();
        let result = db.collection("users").insertOne({
          username: username,
          email: email,
          hash: password
        });
        res(result);
      } catch (err) {
        rej(`error creating user ${err}`);
      }
    });
  }

  static findByEmail(email) {
    return new Promise(async (res, rej) => {
      try {
        const db = await init();
        let result = await db.collection("users").findOne({ email: email });
        console.log(result);
        let user = new User(result);
        res(user);
      } catch (err) {
        rej(`Error retrieving user: ${err}`);
      }
    });
  }

  static findByUsername(username) {
    return new Promise(async (res, rej) => {
      try {
        const db = await init();
        let result = await db.collection("users").find({ username: username });
        let user = new User(result);
        res(user);
      } catch (err) {
        rej(`Error retrieving user: ${err}`);
      }
    });
  }
}

module.exports = User;
