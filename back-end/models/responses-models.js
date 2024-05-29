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

exports.fetchResponsesByUserId = (user_id) => {
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
            return rows;
        });
};
