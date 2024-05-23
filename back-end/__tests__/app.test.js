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
});

describe("/api/venues", () => {
  test("GET 200: Should return an array of venue objects", () => {
    return request(app)
      .get("/api/venues")
      .expect(200)
      .then(({ body }) => {
        const { venues } = body;
        expect(venues).toHaveLength(5);
        venues.forEach((venue) => {
          expect(typeof venue.venue_id).toBe("number");
          expect(typeof venue.venue_name).toBe("string");
          expect(typeof venue.venue_postcode).toBe("string");
          expect(typeof venue.venue_phone).toBe("string");
          expect(typeof venue.venue_latitude).toBe("number");
          expect(typeof venue.venue_longitude).toBe("number");
        });
      });
  });
});
