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
        expect(users).toHaveLength(5);
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

describe("/api/users/:user_id", () => {
  test("PATCH 200: Should update a user object and return it", () => {
    return request(app)
      .patch("/api/users/3")
      .send({
        user_name: "Hanif Pudding",
        team_name: "Leicester Thursday",
        user_address_1: "15 James Street",
        user_address_2: "Rochester",
        user_postcode: "ME1 2YL",
        user_dob: "2002-05-29",
        user_phone: "07734564228",
        user_roles: ["player_bool", "sec_bool"],
        user_email: "thisisnewemail@gmail.com",
        user_password: "newpassword123",
      })
      .expect(200)
      .then(({ body }) => {
        const { user } = body;
        expect(user.user_id).toBe(3);
        expect(user.team_id).toBe(6);
        expect(user.user_name).toBe("Hanif Pudding");
        expect(user.user_address_1).toEqual("15 James Street");
        expect(user.user_address_2).toEqual("Rochester");
        expect(user.user_postcode).toEqual("ME1 2YL");
        expect(user.user_dob).toEqual("2002-05-29");
        expect(user.user_phone).toEqual("07734564228");
        expect(user.user_roles).toEqual(["player", "sec"]);
        expect(user.user_email).toBe("thisisnewemail@gmail.com");
        expect(user.user_password).toBe("newpassword123");
      });
  });

  test("PATCH 404: responds with a status and error message if user id is not found in database", () => {
    return request(app)
      .patch("/api/users/100")
      .send({
        user_name: "Hanif Pudding",
        team_name: "Leicester Thursday",
        user_address_1: "15 James Street",
        user_address_2: "Rochester",
        user_postcode: "ME1 2YL",
        user_dob: "2002-05-29",
        user_phone: "07734564228",
        user_roles: ["player_bool", "sec_bool"],
        user_email: "thisisnewemail@gmail.com",
        user_password: "newpassword123",
      })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("User ID not present in DB");
      });
  });

  test("PATCH 400: responds with a status and error message if user id is invalid", () => {
    return request(app)
      .patch("/api/users/invalid_id")
      .send({
        user_name: "Hanif Pudding",
        team_name: "Leicester Thursday",
        user_address_1: "15 James Street",
        user_address_2: "Rochester",
        user_postcode: "ME1 2YL",
        user_dob: "2002-05-29",
        user_phone: "07734564228",
        user_roles: ["player_bool", "sec_bool"],
        user_email: "thisisnewemail@gmail.com",
        user_password: "newpassword123",
      });
  });
  test("GET 200: Should return a user object corresponding to the passed user id", () => {
    return request(app)
      .get("/api/users/1")
      .expect(200)
      .then(({ body }) => {
        const { user } = body;
        expect(user.user_id).toBe(1);
        expect(user.team_id).toBe(1);
        expect(user.user_name).toBe("Alec");
        expect(user.user_roles).toEqual(["player", "sec"]);
        expect(user.user_address_1).toBe("91 Main Street");
        expect(user.user_address_2).toBe("Swadlincote");
        expect(user.user_postcode).toBe("W1A 1AA");
        expect(user.user_dob).toBe("1980-01-01");
        expect(user.user_phone).toBe("07123456789");
        expect(user.user_email).toBe("hockeylover@gmail.com");
        expect(user.user_password).toBe("password123");
      });
  });

  test("GET 404: Should respond with a status and error message if user id is not found in database", () => {
    return request(app)
      .get("/api/users/100")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("User not found");
      });
  });

  test("GET 400: Should respond with a status and error message if user id is invalid", () => {
    return request(app)
      .get("/api/users/invalid_id")

      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid input");
      });
  });
});

describe("/api/league_tables", () => {
  test("GET 200: Should return an array with the correct keys", () => {
    return request(app)
      .get("/api/league_tables")
      .expect(200)
      .then(({ body }) => {
        const leaguetable = body.league_tables[1];
        leaguetable.forEach((team) => {
          expect(typeof team.team_name).toBe("string");
          expect(typeof team.points).toBe("number");
          expect(typeof team.wins).toBe("number");
          expect(typeof team.draws).toBe("number");
          expect(typeof team.losses).toBe("number");
          expect(typeof team.goals_for).toBe("number");
          expect(typeof team.goals_against).toBe("number");
        });
      });
  });
  test("GET 200: Should return a league table sorted into the correct order", () => {
    return request(app)
      .get("/api/league_tables")
      .expect(200)
      .then(({ body }) => {
        const sortedTables = {
          1: [
            {
              team_name: "Sutton Bonington",
              points: 7,
              wins: 2,
              draws: 1,
              losses: 0,
              goals_for: 7,
              goals_against: 4,
              goal_difference: 3,
            },
            {
              team_name: "Welford",
              points: 1,
              wins: 0,
              draws: 1,
              losses: 1,
              goals_for: 2,
              goals_against: 4,
              goal_difference: -2,
            },
            {
              team_name: "Leicester Thursday",
              points: 0,
              wins: 0,
              draws: 0,
              losses: 1,
              goals_for: 2,
              goals_against: 3,
              goal_difference: -1,
            },
          ],
          2: [
            {
              team_name: "Leicester Wolves",
              points: 6,
              wins: 2,
              draws: 0,
              losses: 1,
              goals_for: 6,
              goals_against: 5,
              goal_difference: 1,
            },
            {
              team_name: "Leicester Oldbags",
              points: 3,
              wins: 1,
              draws: 0,
              losses: 1,
              goals_for: 5,
              goals_against: 4,
              goal_difference: 1,
            },
            {
              team_name: "South Wigston Tigers",
              points: 3,
              wins: 1,
              draws: 0,
              losses: 2,
              goals_for: 6,
              goals_against: 8,
              goal_difference: -2,
            },
          ],
        };
        expect(body.league_tables).toEqual(sortedTables);
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

describe("/api/fixtures", () => {
  test("GET 200: Should return an array of all fixtures", () => {
    return request(app)
      .get("/api/fixtures")
      .expect(200)
      .then(({ body: { fixtures } }) => {
        expect(fixtures.length).toBe(12);
        fixtures.forEach((fixture) => {
          expect(typeof fixture.fixture_id).toBe("number");
          expect(typeof fixture.match_status).toBe("string");
          expect(typeof fixture.team1_id).toBe("number");
          expect(typeof fixture.team1_name).toBe("string");
          expect(typeof fixture.team2_id).toBe("number");
          expect(typeof fixture.team1_name).toBe("string");
          if (fixture.match_status === "completed") {
            expect(typeof fixture.team1_score).toBe("number");
            expect(typeof fixture.team2_score).toBe("number");
          }
          expect(typeof fixture.venue_id).toBe("number");
          expect(typeof fixture.venue_name).toBe("string");
          expect(typeof fixture.match_date).toBe("string");
          expect(typeof fixture.start_time).toBe("string");
          expect(typeof fixture.division).toBe("string");
        });
      });
  });
  test("GET 200: Should return an array fixtures, filtered by match_status", () => {
    return request(app)
      .get("/api/fixtures")
      .query({
        match_status: "completed",
      })
      .expect(200)
      .then(({ body: { fixtures } }) => {
        expect(fixtures.length).toBe(7);
        fixtures.forEach((fixture) => {
          expect(typeof fixture.fixture_id).toBe("number");
          expect(fixture.match_status).toBe("completed");
          expect(typeof fixture.team1_id).toBe("number");
          expect(typeof fixture.team1_name).toBe("string");
          expect(typeof fixture.team2_id).toBe("number");
          expect(typeof fixture.team1_name).toBe("string");
          if (fixture.match_status === "completed") {
            expect(typeof fixture.team1_score).toBe("number");
            expect(typeof fixture.team2_score).toBe("number");
          }
          expect(typeof fixture.venue_id).toBe("number");
          expect(typeof fixture.venue_name).toBe("string");
          expect(typeof fixture.match_date).toBe("string");
          expect(typeof fixture.start_time).toBe("string");
          expect(typeof fixture.division).toBe("string");
        });
      });
  });
  test("GET 200: Should return an array fixtures, filtered by team_id", () => {
    return request(app)
      .get("/api/fixtures")
      .query({
        team_id: 1,
      })
      .expect(200)
      .then(({ body: { fixtures } }) => {
        expect(fixtures.length).toBe(7);
        fixtures.forEach((fixture) => {
          expect(typeof fixture.fixture_id).toBe("number");
          expect(typeof fixture.match_status).toBe("string");
          expect(typeof fixture.team1_id).toBe("number");
          expect(typeof fixture.team1_name).toBe("string");
          expect(typeof fixture.team2_id).toBe("number");
          expect(typeof fixture.team1_name).toBe("string");
          if (fixture.match_status === "completed") {
            expect(typeof fixture.team1_score).toBe("number");
            expect(typeof fixture.team2_score).toBe("number");
          }
          expect(typeof fixture.venue_id).toBe("number");
          expect(typeof fixture.venue_name).toBe("string");
          expect(typeof fixture.match_date).toBe("string");
          expect(typeof fixture.start_time).toBe("string");
          expect(typeof fixture.division).toBe("string");
        });
      });
  });
  test("GET 200: Should return an array fixtures, filtered by division", () => {
    return request(app)
      .get("/api/fixtures")
      .query({
        division: "2",
      })
      .expect(200)
      .then(({ body: { fixtures } }) => {
        expect(fixtures.length).toBe(8);
        fixtures.forEach((fixture) => {
          expect(typeof fixture.fixture_id).toBe("number");
          expect(typeof fixture.match_status).toBe("string");
          expect(typeof fixture.team1_id).toBe("number");
          expect(typeof fixture.team1_name).toBe("string");
          expect(typeof fixture.team2_id).toBe("number");
          expect(typeof fixture.team1_name).toBe("string");
          if (fixture.match_status === "completed") {
            expect(typeof fixture.team1_score).toBe("number");
            expect(typeof fixture.team2_score).toBe("number");
          }
          expect(typeof fixture.venue_id).toBe("number");
          expect(typeof fixture.venue_name).toBe("string");
          expect(typeof fixture.match_date).toBe("string");
          expect(typeof fixture.start_time).toBe("string");
          expect(fixture.division).toBe("2");
        });
      });
  });
  test("GET 200: Should combine queries correctly", () => {
    return request(app)
      .get("/api/fixtures")
      .query({
        division: "2",
        match_status: "completed",
      })
      .expect(200)
      .then(({ body: { fixtures } }) => {
        expect(fixtures.length).toBe(4);
        fixtures.forEach((fixture) => {
          expect(typeof fixture.fixture_id).toBe("number");
          expect(fixture.match_status).toBe("completed");
          expect(typeof fixture.team1_id).toBe("number");
          expect(typeof fixture.team1_name).toBe("string");
          expect(typeof fixture.team2_id).toBe("number");
          expect(typeof fixture.team1_name).toBe("string");
          if (fixture.match_status === "completed") {
            expect(typeof fixture.team1_score).toBe("number");
            expect(typeof fixture.team2_score).toBe("number");
          }
          expect(typeof fixture.venue_id).toBe("number");
          expect(typeof fixture.venue_name).toBe("string");
          expect(typeof fixture.match_date).toBe("string");
          expect(typeof fixture.start_time).toBe("string");
          expect(fixture.division).toBe("2");
        });
      });
  });
});

describe("/api/venues/:venue_id", () => {
  test("GET 200: Should return a venue object", () => {
    return request(app)
      .get("/api/venues/2")
      .expect(200)
      .then(({ body }) => {
        const { venue } = body;
        expect(venue.venue_id).toBe(2);
        expect(venue.venue_name).toBe("Groby Community College");
        expect(venue.venue_postcode).toBe("LE10 1AA");
        expect(venue.venue_phone).toBe("01223456789");
        expect(venue.venue_latitude).toBe(52.65771378088554);
        expect(venue.venue_longitude).toBe(-1.237326940164323);
      });
  });

  test("GET:404 should return error if valid ID but not presence on DB", () => {
    return request(app)
      .get("/api/venues/1234567")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Invalid venue");
      });
  });

  test("GET:400 should return error if invalid ID", () => {
    return request(app)
      .get("/api/venues/invalidID")
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Invalid input");
      });
  });
});

describe("/api/teams", () => {
  test("GET 200: Should return an array of team objects", () => {
    return request(app)
      .get("/api/teams")
      .expect(200)
      .then(({ body }) => {
        const { teams } = body;
        expect(teams).toHaveLength(6);
        teams.forEach((team) => {
          expect(typeof team.team_id).toBe("number");
          expect(typeof team.team_name).toBe("string");
          expect(typeof team.team_division).toBe("string");
          expect(typeof team.team_start_time).toBe("string");
          expect(typeof team.venue_id).toBe("number");
        });
      });
  });
});

describe("/api/fixtures/:fixture_id", () => {
  test("GET 200: Responds with endpoint json data", () => {
    return request(app)
      .get("/api/fixtures/3")
      .expect(200)
      .then(({ body }) => {
        const fixtures = body.fixture;
        fixtures.forEach((fixture) => {
          expect(typeof fixture.fixture_id).toBe("number");
          expect(typeof fixture.match_status).toBe("string");
          expect(typeof fixture.team1_id).toBe("number");
          expect(typeof fixture.team1_name).toBe("string");
          expect(typeof fixture.team2_id).toBe("number");
          expect(typeof fixture.team2_name).toBe("string");
          expect(typeof fixture.team1_score).toBe("number");
          expect(typeof fixture.team2_score).toBe("number");
          expect(typeof fixture.venue_id).toBe("number");
          expect(typeof fixture.venue_name).toBe("string");
          expect(typeof fixture.match_date).toBe("string");
          expect(typeof fixture.start_time).toBe("string");
          expect(typeof fixture.division).toBe("string");
        });
      });
  });
  test("GET 404: Returns an error with a path of the right type, but not present in database", () => {
    return request(app)
      .get("/api/fixtures/999")
      .expect(404)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toBe("Not found");
      });
  });
  test("GET 400: Returns an error with a path of the wrong type", () => {
    return request(app)
      .get("/api/fixtures/banana")
      .expect(400)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toBe("bad request");
      });
  });
});
