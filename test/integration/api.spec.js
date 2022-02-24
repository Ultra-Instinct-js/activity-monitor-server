let token;
let userid;
let api;

describe("Endpoints", () => {
  beforeAll(async () => {
    api = app.listen(5000, () =>
      console.log("Test server running on port 5000")
    );
    console.log(await resetTestDB());
    const login = await request(api)
      .post("/auth/login")
      .send({
        email: "test1@email.com",
        password: "smurf123"
      })
      .set("accept", "json");
    token = login.body.token;
    userid = login.body.userId;
  });

  beforeEach(async () => {
    await resetTestDB();
  });

  afterAll(async () => {
    console.log("Gracefully stopping test server");
    await api.close((err) => {});
  });

  let habitId;
  let habit = "drink juice";
  let goal = 3;
  let unit = "meters";
  let duration = 28;

  it("should delete user when given a valid id and token", async () => {
    await request(api)
      .delete(`/users/${userid}`)
      .set("Accept", "application/json")
      .set("authorization", `${token}`)
      .then((response) => {
        expect(response.statusCode).toEqual(204);
      });
  });
  it("should not delete user when given a bad id and wrong token", async () => {
    await request(api)
      .delete(`/users/12349872134}`)
      .set("Accept", "application/json")
      .set("authorization", `${token}`)
      .then((response) => {
        expect(response.statusCode).toEqual(500);
      });
  });
  it("should return an unauthorised status when given valid id and bad token", async () => {
    await request(api)
      .delete(`/users/${userid}`)
      .set("Accept", "application/json")
      .set("authorization", `Bearer 1237895jkhjkhkjkg4231g2g4j21k4g`)
      .then((response) => {
        expect(response.statusCode).toEqual(403);
      });
  });
  it("should get all habits from a user with valid token", async () => {
    await request(api)
      .get(`/users/${userid}/habits`)
      .set("Accept", "application/json")
      .set("authorization", `${token}`)
      .then((response) => {
        expect(response.statusCode).toEqual(200);
      });
  });
  it("should return 404 with an invalid user ", async () => {
    await request(api)
      .get(`/users/487687368736426486387hjgf4ghj3f4hgj/habits`)
      .set("Accept", "application/json")
      .set("authorization", `${token}`)
      .then((response) => {
        expect(response.statusCode).toEqual(404);
      });
  });
  it("should not get all habits from a user with invalid token", async () => {
    await request(api)
      .get(`/users/${userid}/habits`)
      .set("Accept", "application/json")
      .set("authorization", `Bearer 432123424lkjh23kj423h4kj12hkjl`)
      .then((response) => {
        expect(response.statusCode).toEqual(403);
      });
  });
  it("should create new habit", async () => {
    await request(api)
      .post(`/users/${userid}/habits`)
      .send(
        JSON.stringify({
          habit,
          goal: parseInt(goal),
          unit,
          duration: parseInt(duration)
        })
      )
      .set("Content-Type", "application/json")
      .set("authorization", `${token}`)
      .then((response) => {
        habitId = response.body.insertedId;
        expect(response.statusCode).toEqual(201);
        expect(habitId).not.toBe("");
      });
  });
  it("should not create new habit with incorrect paramaters", async () => {
    await request(api)
      .post(`/users/${userid}/habits`)
      .send(
        JSON.stringify({
          habit,
          goal,
          unit
        })
      )
      .set("Content-Type", "application/json")
      .set("authorization", `${token}`)
      .then((response) => {
        expect(response.statusCode).toEqual(500);
      });
  });
  it("should update a habit with a valid input", async () => {
    let progress = 2;
    await request(api)
      .patch(`/users/${userid}/habits/${habitId}`)
      .send(JSON.stringify({ progress }))
      .set("Content-Type", "application/json")
      .set("authorization", `${token}`)
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.body).not.toBe("");
      });
  });
  it("should not update a habit with invalid input", async () => {
    let progress = "hello";
    await request(api)
      .patch(`/users/${userid}/habits/${habitId}`)
      .send(JSON.stringify({ progress }))
      .set("Content-Type", "application/json")
      .set("authorization", `${token}`)
      .then((response) => {
        expect(response.statusCode).toEqual(500);
      });
  });
  it("should delete habit with correct id and token", async () => {
    await request(api)
      .delete(`/users/${userid}/habits/${habitId}`)
      .set("Content-Type", "application/json")
      .set("authorization", `${token}`)
      .then((response) => {});
  });
  it("should register a user", async () => {
    let username = "test1";
    let email = "test3@getMaxListeners.com";
    let password = "test123";
    await request(api)
      .post(`/auth/register`)
      .send(JSON.stringify({ username, email, password }))
      .set("Content-Type", "application/json")
      .then((response) => {
        expect(response.statusCode).toEqual(201);
        expect(response.body).toEqual("User created");
      });
  });
});
