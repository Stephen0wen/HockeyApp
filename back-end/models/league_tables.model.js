const db = require("../db/connection");

exports.selectCompletedFixtures = () => {
    return db
        .query(
            `
      SELECT
        team1.team_name AS team1_name,
        team2.team_name AS team2_name,
        team1_score,
        team2_score,
        team1.team_division AS division
      FROM fixtures
      JOIN teams AS team1
        ON fixtures.team1_id = team1.team_id
      JOIN teams AS team2
        ON fixtures.team2_id = team2.team_id
      WHERE fixtures.match_status = 'completed' 
  `
        )
        .then(({ rows }) => {
            return rows;
        });
};

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
