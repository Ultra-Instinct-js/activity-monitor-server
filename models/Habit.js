const { init } = require("../dbConfig");

class Habit {
  constructor(data) {
    for (let key in data) {
      this[key] = data[key];
    }
  }

  static all(id) {
    return new Promise(async (res, rej) => {
      try {
        const db = await init();
        let results = db.collections("habits").find({ user: id }).toArray();
        let habits = results.map((h) => {
          new Habit(h);
        });
        res(habits);
      } catch (error) {
        rej(error);
      }
    });
  }

  static findById() {
    return new Promise(async (resolve, reject) => {
      try {
        const db = await init();
        let result = await db
          .collection("habits")
          .find({ _id: ObjectId(id) })
          .toArray();
        let habit = new Habit({ ...result[0], id: result[0]._id });
        resolve(habit);
      } catch (err) {
        reject("Habit not found");
      }
    });
  }

  static create(data) {
    return new Promise(async (res, rej) => {
      try {
        const db = await init();
        let result = db.collections("habits").insertOne({
          user: data.user,
          habit: data.habit,
          goal: data.goal,
          uni: data.unit,
          creationDate: Date.now(),
          duration: data.duration
        });
        resolve(result);
      } catch (error) {
        rej(error);
      }
    });
  }

  updateProgress(progress) {
    return new Promise(async (res, rej) => {
      try {
        const db = await init();
        let result = db.collections("habits").findOneAndUpdate(
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
