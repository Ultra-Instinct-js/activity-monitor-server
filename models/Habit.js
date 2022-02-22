const { init } = require("../dbConfig");

const { ObjectId } = require("mongodb");

class Habit {
  constructor(data) {
    for (let key in data) {
      this[key] = data[key];
    }
  }

  static getAll(id) {
    return new Promise(async (res, rej) => {
      try {
        const db = await init();
        let results = await db
          .collection("habits")
          .find({ user: ObjectId(id) })
          .toArray();
        console.log(results);
        let habits = results.map((h) => new Habit({ ...h }));
        console.log(habits);
        res(habits);
      } catch (error) {
        rej(error);
      }
    });
  }

  static findById() {
    return new Promise(async (res, rej) => {
      try {
        const db = await init();
        let result = await db
          .collection("habits")
          .find({ _id: ObjectId(id) })
          .toArray();
        let habit = new Habit({ ...result[0], id: result[0]._id });
        res(habit);
      } catch (err) {
        rej("Habit not found");
      }
    });
  }

  static create(id, data) {
    return new Promise(async (res, rej) => {
      try {
        const db = await init();
        let result = db.collection("habits").insertOne({
          user: ObjectId(id),
          habit: data.habit,
          goal: data.goal,
          unit: data.unit,
          creationDate: Date.now(),
          duration: data.duration,
          history: []
        });
        res(result);
      } catch (error) {
        rej(error);
      }
    });
  }

  updateProgress(progress) {
    return new Promise(async (res, rej) => {
      try {
        const db = await init();
        let result = db.collection("habits").findOneAndUpdate(
          {
            _id: ObjectId(this.id)
          },
          {
            $push: {
              history: {
                time: Date.now(),
                amount: progress
              }
            }
          }
        );
        res(result);
      } catch (error) {
        rej(error);
      }
    });
  }

  destroy() {
    return new Promise(async (res, rej) => {
      try {
        const db = await init();
        db.collection("habits").deleteOne({ _id: ObjectId(this.id) });
        res("habit deleted");
      } catch (err) {
        rej("Habit could not be deleted");
      }
    });
  }
}

module.exports = Habit;
