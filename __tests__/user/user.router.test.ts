import request from "supertest";
import { createServer } from "../../src/server";
import { testConfig } from "../../src/utils/config.server";

describe("User", () => {
  test("Login", async () => {
    const app = createServer(testConfig.server);

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
    const app = createServer(testConfig.server);
  
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
