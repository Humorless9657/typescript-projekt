import request from "supertest";
import { createServer } from "../../src/server";

describe("Dev", () => {
  test("Get dev with id 1", async () => {
    const app = createServer({
      port: 3000,
      corsoptions: {},
      limiter: {
        time: 1000,
        max: 10,
        message: "Too many requests",
      },
    });

    const res = await request(app).get("/api/devs/1");
    expect(res.body).toMatchObject({
      id: 1,
      name: "Insomniac Games",
    });
  });
});

test("Get all devs", async () => {
  const app = createServer({
    port: 3000,
    corsoptions: {},
    limiter: {
      time: 1000,
      max: 10,
      message: "Too many requests",
    },
  });

  const res = await request(app).get("/api/devs");
  expect(res.status).toBe(200);
});

test("Create new dev", async () => {
  const app = createServer({
    port: 3000,
    corsoptions: {},
    limiter: {
      time: 1000,
      max: 10,
      message: "Too many requests",
    },
  });

  const user = {
    id: 1,
    username: "Jimmy",
    password: "password",
  };

  const token = await request(app).post("/api/users/login").send(user);

  const newDev = {
    name: "Capcom",
    headquarters: "Tokyo, Japan",
  };

  const res = await request(app)
    .post("/api/devs")
    .set("Authorization", "Bearer " + token.body.accessToken)
    .set("Content-Type", "application/json")
    .send(newDev);
  expect(res.status).toBe(201);
});

test("Update dev 2", async () => {
  const app = createServer({
    port: 3000,
    corsoptions: {},
    limiter: {
      time: 1000,
      max: 10,
      message: "Too many requests",
    },
  });

  const user = {
    id: 1,
    username: "Jimmy",
    password: "password",
  };

  const token = await request(app).post("/api/users/login").send(user);

  const updateDev = {
    name: "CapcomTest",
    headquarters: "Tokyo, Japan",
  };

  const res = await request(app)
    .put("/api/devs/3")
    .set("Authorization", "Bearer " + token.body.accessToken)
    .set("Content-Type", "application/json")
    .send(updateDev);
  expect(res.status).toBe(200);
});
