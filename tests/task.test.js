const mongoose = require("mongoose");
const request = require("supertest");
const connectDB = require("../config/db");
const app = require("../app");

let testingID = "";

/* Connection Database Before Each Test */
beforeEach(async () => {
  await connectDB(MONGO_URI);
});

/* Close Database After Each Connection */
afterEach(async () => {
  await mongoose.connection.close();
});

/*  Create a Testing Task */

describe("Create a Task", () => {
  test("It Should Create a new Task", async () => {
    const res = await request(app).post("/task/").send({
      name: "Clean PC",
      completed: false,
    });
    testingID = JSON.parse(res.text).ntask._id;
    console.log(testingID);
    expect(res.statusCode).toBe(201);
  });
});

/*  Fetch a Testing Task */
describe("Get a Task", () => {
  test("It Should Fetch a single Task by ID", async () => {
    const res = await request(app).get(`/task/${testingID}`);
    expect(res.statusCode).toBe(200);
  });
});

/*  Get all Tasks */
describe("GET All Tasks", () => {
  test("It Should return all Task", async () => {
    const res = await request(app).get("/task");
    const bodyLen = JSON.parse(res.text).Tasks.length;
    expect(bodyLen).toBeGreaterThan(0);
    expect(res.statusCode).toBe(200);
  });
});

/* Update a Testing Task */
describe("Update a Task", () => {
  test("It Should Update a Task with ID", async () => {
    const res = await request(app).patch(`/task/${testingID}`).send({
      name: "Clean PC",
      completed: true,
    });
    expect(res.statusCode).toBe(200);
  });
});

/* Delete a Testing Task */
describe("Delete a Task", () => {
  test("It Should delete a Task with ID", async () => {
    const res = await request(app).delete(`/task/${testingID}`);
    expect(res.statusCode).toBe(400);
  });
});
