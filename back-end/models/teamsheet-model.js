const db = require("../db/connection");

exports.selectTeamsheet = (fixture_id, team_id) => {
    return db
        .query(
            `
    SELECT 
      user_name AS name,
      users.user_id,
      response
    FROM fixtures
    JOIN users
      ON users.team_id = fixtures.team1_id
        OR users.team_id = fixtures.team2_id
    JOIN responses
      ON responses.user_id = users.user_id 
        AND responses.fixture_id = fixtures.fixture_id
    WHERE fixtures.fixture_id = $1
      AND users.team_id = $2
    ORDER BY created_at ASC
    `,
            [fixture_id, team_id]
        )
        .then(({ rows }) => {
            const formattedRows = rows.map((row) => {
                if (row.response == 0) {
                    row.availability = "no";
                }
                if (row.response == 1) {
                    row.availability = "maybe";
                }
                if (row.response == 2) {
                    row.availability = "yes";
                }
                delete row.response;
                return row;
            });
            return formattedRows;
        });
};
