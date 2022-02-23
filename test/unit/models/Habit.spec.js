const Habit = require("../../../models/Habit");
const User = require("../../../models/User");

jest.mock("../../../models/User");
const mongo = require("mongodb");
jest.mock("mongodb");

const db = require("../../../dbConfig");

describe("Habit", () => {
  beforeEach(() => jest.clearAllMocks());

  afterAll(() => jest.resetAllMocks());

  describe("all", () => {
    it("resolves with all Habits for a user on successful query", async () => {
      let habitData1 = {
        user: "6214cd3b68944f786fe648a3",
        habit: "drink water",
        goal: 8,
        unit: "hours",
        creationDate: 1645533922812,
        duration: 7,
        history: []
      };

      db.collection("habits").find({ user: ObjectId(id) }) = jest.fn().mockReturnValue()

      
    });
  });
});
