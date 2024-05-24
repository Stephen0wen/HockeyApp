const db = require("../db/connection");

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
