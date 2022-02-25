const request = require("supertest");
const { MongoClient } = require("mongodb");
const connectionUrl = process.env.DB_CONNECTION_URI;
const dbName = process.env.DB_NAME;
const app = require("../../server.js");
let client;

const seed = async (db) => {
  const collections = await db.listCollections().toArray();
  if (collections != []) {
    if (collections.includes("users")) {
      await db.collection("users").drop();
    }
    if (collections.includes("habits")) {
      await db.collection("habits").drop();
    }
  }

  const insertedIds = await db.collection("users").insertMany([
    {
      name: "alien",
      email: "test1@email.com",
      hash: "$2a$10$cFp6GLXN9.SIN21QOVBKFOV53zNo.sx3Hx9SHeRIkV3yknmRVF.XO"
    },
    {
      name: "budhole",
      age: "test2@email.com",
      hash: "$2a$10$cFp6GLXN9.SIN21QOVBKFOV53zNo.sx3Hx9SHeRIkV3yknmRVF.XO"
    }
  ]);

  await db.collection("habits").insertMany([
    {
      user: insertedIds.insertedIds[0],
      habit: "drink water",
      goal: 3,
      unit: "meters",
      creationDate: 1645613578473,
      duration: 28,
      history: []
    },
    {
      user: insertedIds.insertedIds[0],
      habit: "drink milk",
      goal: 3,
      unit: "meters",
      creationDate: 1645613578473,
      duration: 28,
      history: []
    },
    {
      user: insertedIds.insertedIds[1],
      habit: "drink water",
      goal: 3,
      unit: "meters",
      creationDate: 1645613578473,
      duration: 28,
      history: []
    }
  ]);
};

const resetTestDB = () => {
  return new Promise(async (resolve, reject) => {
    try {
      client = await MongoClient.connect(connectionUrl);
      const db = client.db(dbName);
      await seed(db);
      resolve("Test DB reset");
    } catch (err) {
      reject(`Test DB could not be reset: ${err}`);
    }
  });
};

global.request = request;
global.app = app;
global.resetTestDB = resetTestDB;
global.port = process.env.PORT || 5000;
