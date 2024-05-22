const db = require("../db/connection");

exports.selectUsers = () => {
  return db
    .query(
      `SELECT users.user_id, users.team_id, user_name, team_name, player_bool, sec_bool, umpire_bool, organiser_bool, user_address_1, user_address_2, user_postcode, user_dob, user_phone FROM users JOIN roles ON users.user_id = roles.user_id JOIN teams ON users.team_id = teams.team_id;`
    )
    .then(({ rows }) => {
      const userRows = rows.map((row) => {
        row.user_role = [];
        for (const [key, value] of Object.entries(row)) {
          if (value === true) {
            row.user_role.push(key.slice(0, -5));
          }
        }
        row.user_dob = row.user_dob.toISOString().slice(0, 10);
        return row;
      });
      console.log(userRows);
      return userRows;
    });
};
