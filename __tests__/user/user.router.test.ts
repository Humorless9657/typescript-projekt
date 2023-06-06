import request from "supertest";
import { createServer } from "../../src/server";

describe("User", () => {
  test("Login", async () => {
    const app = createServer({
      port: 3000,
      corsoptions: {},
      limiter: {
        time: 1000,
        max: 10,
        message: "Too many requests",
      },
    });

    const newUser = {
      id: 1,
      username: "John",
      password: "password",
    };

    const res = await request(app).post("/api/users/login").send(newUser);

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      accessToken: expect.any(String),
    });
  });
  test("Create new user", async () => {
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
      username: "JohnTest",
      password: "password",
    };
  
    const res = await request(app)
      .post("/api/users/signup")
      .set("Content-Type", "application/json")
      .send(user);
    expect(res.status).toBe(201);
  });
});
