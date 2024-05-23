const app = require("../app");
const request = require("supertest");
const endpoints = require("../../endpoints.json");
const db = require("../db/connection");
const seed = require("../db/seeds/seeds");
const data = require("../db/data/test-data/index");

afterAll(() => {
  return db.end();
});

beforeEach(() => {
  return seed(data);
});

describe("/api", () => {
  test("GET:200 Should return endpoints.json to the client", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual(endpoints);
      });
  });
});

describe("/api/users", () => {
  test("GET 200: Should return an array of user objects", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        const { users } = body;
        expect(users).toHaveLength(35);
        users.forEach((user) => {
          expect(typeof user.user_id).toBe("number");
          expect(typeof user.team_id).toBe("number");
          expect(typeof user.user_name).toBe("string");
          expect(typeof user.team_name).toBe("string");
          expect(typeof user.user_role).toBe("object");
          expect(typeof user.user_address_1).toBe("string");
          expect(typeof user.user_address_2).toBe("string");
          expect(typeof user.user_postcode).toBe("string");
          expect(typeof user.user_dob).toBe("string");
          expect(typeof user.user_phone).toBe("string");
        });
      });
  });

  test("POST 201: Should insert a user object into users and return it", () => {
    return request(app)
      .post("/api/users")
      .send({
        user_name: "Alfie Fenables",
        team_name: "Leicester Wolves",
        user_roles: ["player_bool", "sec_bool"],
        user_email: "magicthegathering@gmail.com",
        user_password:
          "$2b$10$3wRojGZW9C.BUu7qThkvr.WdF/096rlW48q.rOqYPo9YsOQ6XhiEK",
      })
      .expect(201)
      .then(({ body }) => {
        const { user } = body;
        expect(typeof user.user_id).toBe("number");
        expect(typeof user.team_id).toBe("number");
        expect(user.user_name).toBe("Alfie Fenables");
        expect(user.user_roles).toEqual(["player", "sec"]);
        expect(user.user_email).toBe("magicthegathering@gmail.com");
        expect(user.user_password).toBe(
          "$2b$10$3wRojGZW9C.BUu7qThkvr.WdF/096rlW48q.rOqYPo9YsOQ6XhiEK"
        );
      });
  });
});
