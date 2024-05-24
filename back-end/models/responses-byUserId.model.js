const db = require("../db/connection");

const fetchResponsesByUserId = (user_id) => {
  if (isNaN(user_id) || user_id <= 0) {
    return Promise.reject({ status: 400, msg: "bad request" });
  }
  return db
    .query(
      `SELECT
    r.user_id,
    r.fixture_id,
    r.response,
    r.created_at,
    r.updated_at
FROM
    responses r
JOIN
    users u ON r.user_id = u.user_id WHERE u.user_id = $1;`,
      [user_id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
      return rows;
    });
};

module.exports = { fetchResponsesByUserId };
