const db = require("../db/connection");

exports.selectTeams = () => {
  return db
    .query(
      `SELECT team_id, team_name, team_division, team_start_time, venue_id FROM teams;`
    )
    .then(({ rows }) => {
      return rows;
    });
};
