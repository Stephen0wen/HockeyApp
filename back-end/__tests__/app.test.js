const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seeds");
const data = require("../db/data/test-data/index");

afterAll(() => {
  return db.end();
});

beforeEach(() => {
  return seed(data);
});

describe("/api/league_tables", () => {
  test("GET 200: responds with an array of league table objects", () => {
    return request(app)
      .get("/api/league_tables")
      .expect(200)
      .then(({ body }) => {
        const tables = body.league_tables;
        expect(tables.length).toBe(2);
        tables.forEach((table) => {
          expect(typeof table.division_id).toBe("string");
          tables.ranks.forEach((rank) => {
            expect(typeof rank.team_name).toBe("string");
            expect(typeof rank.points).toBe("number");
            expect(typeof rank.wins).toBe("number");
            expect(typeof rank.draws).toBe("number");
            expect(typeof rank.losses).toBe("number");
            expect(typeof rank.goals_for).toBe("number");
            expect(typeof rank.goals_against).toBe("number");
          });
        });
      });
  });
});
