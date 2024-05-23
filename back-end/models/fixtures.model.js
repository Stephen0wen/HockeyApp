const db = require("../db/connection");

exports.selectAllFixtures = () => {
    return db
        .query(
            `
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
      ON fixtures.match_venue = venues.venue_id
    ;`
        )
        .then(({ rows }) => {
            return rows;
        });
};
