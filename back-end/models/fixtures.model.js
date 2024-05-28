const db = require("../db/connection");
const moment = require("moment");

exports.fetchFixturesById = (fixture_id) => {
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

exports.updateFixtureById = (fixture_id, body) => {
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

exports.selectAllFixtures = ({ match_status, team_id, division }) => {
  const sqlArr = [];
  let insertposition = 1;
  let sqlString = `
    SELECT
      fixture_id,
      match_status,
      team1_id,
      team1.team_name AS team1_name,
      team2_id,
      team2.team_name AS team2_name,
      team1_score,
      team2_score,
      match_venue AS venue_id,
      venue_name,
      match_date,
      team1.team_start_time AS start_time,
      team1.team_division AS division
    FROM fixtures
    JOIN teams AS team1
      ON fixtures.team1_id = team1.team_id
    JOIN teams AS team2
      ON fixtures.team2_id = team2.team_id
    JOIN venues
      ON fixtures.match_venue = venues.venue_id`;

  if (match_status) {
    sqlString += `
    WHERE match_status = $${insertposition++}`;
    sqlArr.push(match_status);
  }

  if (team_id && insertposition > 1) {
    sqlString += `
    AND (team1_id = $${insertposition++}
      OR team2_id = $${insertposition++})`;
    sqlArr.push(team_id);
    sqlArr.push(team_id);
  }

  if (team_id && insertposition === 1) {
    sqlString += `
    WHERE (team1_id = $${insertposition++}
      OR team2_id = $${insertposition++})`;
    sqlArr.push(team_id);
    sqlArr.push(team_id);
  }

  if (division && insertposition > 1) {
    sqlString += `
      AND team1.team_division = $${insertposition++}`;
    sqlArr.push(division);
  }

  if (division && insertposition === 1) {
    sqlString += `
    WHERE team1.team_division = $${insertposition++}`;
    sqlArr.push(division);
  }

  return db.query(sqlString, sqlArr).then(({ rows }) => {
    return rows;
  });
};
