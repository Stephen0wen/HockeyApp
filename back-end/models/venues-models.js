const db = require("../db/connection");

exports.selectVenues = () => {
  return db
    .query(
      `SELECT venue_id, venue_name, venue_postcode, venue_phone, venue_latitude, venue_longitude from venues;`
    )
    .then(({ rows }) => {
      return rows;
    });
};
