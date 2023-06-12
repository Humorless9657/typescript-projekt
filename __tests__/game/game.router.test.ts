import request from "supertest";
import { createServer } from "../../src/server";
import { testConfig } from "../../src/utils/config.server";

describe("Game", () => {
  test("Get game with id 1", async () => {
    const app = createServer(testConfig.server);

    const res = await request(app).get("/api/games/1");
    expect(res.body).toMatchObject({
      id: 1,
      title: "Ratchet & Clank: Rift Apart",
      genre: "Platform",
      platform: "PlayStation 5",
    });
  });
});

test("Get all games", async () => {
  const app = createServer(testConfig.server);

  const res = await request(app).get("/api/games");
  expect(res.status).toBe(200);
});

test("Create game", async () => {
  const app = createServer(testConfig.server);

  const user = {
    id: 1,
    username: "John",
    password: "password",
  };

  const token = await request(app).post("/api/users/login").send(user);

  const newGame = {
    title: "Elden Ring",
    genre: "Action RPG",
    platform: "PlayStation 5",
    datePublished: "2022-02-25",
    multiplayerMode: true,
    metacriticScore: 96,
    developerId: 1,
  };

  const res = await request(app)
    .post("/api/games")
    .set("Authorization", "Bearer " + token.body.accessToken)
    .set("Content-Type", "application/json")
    .send(newGame);
  expect(res.status).toBe(201);
});

test("Update game 2", async () => {
  const app = createServer(testConfig.server);

  const user = {
    id: 1,
    username: "John",
    password: "password",
  };

  const token = await request(app).post("/api/users/login").send(user);

  const updateGame = {
    title: "Elden Ring Test",
    genre: "Action RPG",
    platform: "PlayStation 5",
    datePublished: "2022-02-25",
    multiplayerMode: true,
    metacriticScore: 96,
	  developerId: 2
};

  const res = await request(app)
    .put("/api/games/3")
    .set("Authorization", "Bearer " + token.body.accessToken)
    .set("Content-Type", "application/json")
    .send(updateGame);
  expect(res.status).toBe(200);
});
