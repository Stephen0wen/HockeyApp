const db = require("../db/connection");

exports.selectLeagueTables = () => {
  return db.query(`SELECT `);
};
