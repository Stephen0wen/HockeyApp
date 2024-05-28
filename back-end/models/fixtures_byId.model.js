const db = require("../db/connection");
const moment = require("moment");

const fetchFixturesById = (fixture_id) => {
  if (isNaN(fixture_id) || fixture_id <= 0) {
    return Promise.reject({ status: 400, msg: "bad request" });
  }
  return db
    .query(
      `SELECT
    f.fixture_id,
    f.match_status,
    f.team1_id,
    t1.team_name AS team1_name,
    f.team2_id,
    t2.team_name AS team2_name,
    f.team1_score,
    f.team2_score,
    f.match_venue AS venue_id,
    v.venue_name,
    f.match_date,
    t1.team_start_time AS start_time,
    t1.team_division AS division
FROM
    fixtures f
JOIN
    teams t1 ON f.team1_id = t1.team_id
JOIN
    teams t2 ON f.team2_id = t2.team_id
JOIN
    venues v ON f.match_venue = v.venue_id WHERE fixture_id = $1;`,
      [fixture_id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
      return rows;
    });
};

const updateFixtureById = (fixture_id, body) => {
  const { match_status, team1_score, team2_score } = body;
  if (isNaN(fixture_id) || fixture_id <= 0) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }
  return db
    .query(
      `
    UPDATE fixtures
    SET match_status = $2, team1_score = $3, team2_score = $4
    WHERE fixtures.fixture_id = $1
    RETURNING *
    `,
      [fixture_id, match_status, team1_score, team2_score]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "Fixture ID not present in DB",
        });
      }
      rows[0].match_date = moment(rows[0].match_date).format("YYYY-MM-DD");
      return rows[0];
    });
};

module.exports = { fetchFixturesById, updateFixtureById };
