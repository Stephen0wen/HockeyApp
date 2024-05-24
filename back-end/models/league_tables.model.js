const db = require("../db/connection");

exports.selectHomeFixtures = () => {
    return db
        .query(
            `
      SELECT 
        team_name,
        team1_score AS scored,
        team2_score AS conceded,
        team_division AS division
      FROM fixtures
      JOIN teams 
        ON fixtures.team1_id = teams.team_id
      WHERE fixtures.match_status = 'completed' 
      ;`
        )
        .then(({ rows }) => {
            return rows;
        });
};

exports.selectAwayFixtures = () => {
    return db
        .query(
            `
    SELECT 
      team_name,
      team2_score AS scored,
      team1_score AS conceded,
      team_division AS division
    FROM fixtures
    JOIN teams 
      ON fixtures.team2_id = teams.team_id
    WHERE fixtures.match_status = 'completed' 
    ;`
        )
        .then(({ rows }) => {
            return rows;
        });
};
