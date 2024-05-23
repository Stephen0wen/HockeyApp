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
      return userRows;
    });
};

exports.insertUser = ({
  user_name,
  team_name,
  user_roles,
  user_email,
  user_password,
}) => {
  return db
    .query(`SELECT team_id from teams WHERE team_name = $1`, [team_name])
    .then(({ rows }) => {
      return rows[0].team_id;
    })
    .then((team_id) => {
      const insertVals = [team_id, user_name, user_email, user_password];
      return db.query(
        `INSERT INTO users (team_id, user_name, user_email, user_password)
        VALUES ($1, $2, $3, $4)
        RETURNING *;`,
        insertVals
      );
    })
    .then(({ rows }) => {
      const { user_id } = rows[0];
      return Promise.all(
        user_roles.map((user_role) => {
          return db.query(
            `INSERT INTO roles (user_id, ${user_role})
          VALUES (${user_id}, true)
          ON CONFLICT(user_id)
          DO UPDATE SET ${user_role} = EXCLUDED.${user_role}
          RETURNING *`
          );
        })
      );
    })
    .then(() => {
      return db.query(
        `SELECT * FROM users JOIN roles ON users.user_id = roles.user_id WHERE users.user_email = $1`,
        [user_email]
      );
    })
    .then(({ rows }) => {
      rows[0].user_roles = [];
      for (const [key, value] of Object.entries(rows[0])) {
        if (value === true) {
          rows[0].user_roles.push(key.slice(0, -5));
        }
      }
      return rows[0];
    });
};
