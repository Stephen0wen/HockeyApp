const db = require("../db/connection");

exports.selectTeams = () => {
  return db
    .query(
      `SELECT team_id, team_name, team_division, team_start_time, venue_id FROM teams;`
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "no teams in database",
        });
      } else return rows;
    });
};

exports.selectTeamById = (team_id) => {
  return db
    .query(
      `
        SELECT *
        FROM teams
        WHERE team_id = $1
  `,
      [team_id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "Not found",
        });
      }
      return rows[0];
    });
};
