const db = require("../db/connection");
const moment = require("moment");

const insertUserRoles = (user_id, user_roles) => {
  if (!user_roles) {
    return Promise.resolve();
  }
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
  ).catch((error) => {
    return error;
  });
};

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

exports.selectUserById = (user_id) => {
  return db
    .query(
      `SELECT * FROM users JOIN roles ON users.user_id = roles.user_id WHERE users.user_id = $1`,
      [user_id]
    )
    .then(({ rows }) => {
      if (!rows.length) {
        return Promise.reject({
          status: 404,
          msg: "User not found",
        });
      }
      rows[0].user_roles = [];
      for (const [key, value] of Object.entries(rows[0])) {
        if (value === true) {
          rows[0].user_roles.push(key.slice(0, -5));
        }
      }
      rows[0].user_dob = rows[0].user_dob.toISOString().slice(0, 10);
      return rows[0];
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
      return insertUserRoles(user_id, user_roles);
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

exports.updateUserById = (user_id, body) => {
  return insertUserRoles(user_id, body.user_roles)
    .then(() => {
      return db.query(`SELECT team_id from teams WHERE team_name = $1`, [
        body.team_name || "Leicester Wolves",
      ]);
    })
    .then(({ rows }) => {
      return rows[0].team_id;
    })
    .then((team_id) => {
      let insertPosition = 1;
      const updateVals = [];
      let sqlQueryString = `UPDATE users SET `;

      if (body.team_name) {
        updateVals.push(team_id);
        sqlQueryString += `team_id = $${insertPosition++},`;
      }
      for (const [key, value] of Object.entries(body)) {
        if (key !== "team_name" && key !== "user_roles") {
          updateVals.push(value);
          sqlQueryString += `${key} = $${insertPosition++},`;
        }
      }
      let sqlQueryStringTrimmed = sqlQueryString.slice(0, -1);

      updateVals.push(user_id);
      sqlQueryStringTrimmed += `
    WHERE user_id = $${insertPosition++}
    RETURNING *;
    `;

      return db.query(sqlQueryStringTrimmed, updateVals);
    })
    .then(() => {
      return db.query(
        `SELECT * FROM users JOIN roles ON users.user_id = roles.user_id WHERE users.user_id = $1`,
        [user_id]
      );
    })
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "User ID not present in DB",
        });
      }
      rows[0].user_roles = [];
      for (const [key, value] of Object.entries(rows[0])) {
        if (value === true) {
          rows[0].user_roles.push(key.slice(0, -5));
        }
      }
      rows[0].user_dob = moment(rows[0].user_dob).format("YYYY-MM-DD");
      return rows[0];
    });
};

exports.removeUserByUserId = (user_id) => {
  return db
    .query(`DELETE FROM responses WHERE user_id=$1 RETURNING *`, [user_id])
    .then(() => {
      return db.query(`DELETE FROM roles WHERE user_id=$1 RETURNING *`, [
        user_id,
      ]);
    })
    .then(() => {
      return db.query(`DELETE FROM users WHERE user_id=$1 RETURNING *`, [
        user_id,
      ]);
    })
    .then(({ rows: deleted_users }) => {
      if (deleted_users.length === 0) {
        return Promise.reject({ status: 404, msg: "Unable to delete user" });
      }
    });
};
