const db = require("../db/connection");

exports.insertResponse = ({ user_id, fixture_id, response }) => {
  const insertVals = [user_id, fixture_id, response];
  return db
    .query(
      `
  DELETE FROM responses WHERE user_id = $1 AND fixture_id = $2;
  `,
      [user_id, fixture_id]
    )
    .then(() => {
      return db.query(
        `
    INSERT INTO responses (user_id, fixture_id, response)
    VALUES ($1, $2, $3)
    RETURNING *;
    `,
        insertVals
      );
    })
    .then(({ rows }) => {
      return rows[0];
    });
};
