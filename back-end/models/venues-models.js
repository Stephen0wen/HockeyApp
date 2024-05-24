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

exports.selectVenueById = (venue_id) => {
  return db
    .query(
      `SELECT venue_id, venue_name, venue_postcode, venue_phone, venue_latitude, venue_longitude from venues WHERE venue_id=$1;`,
      [venue_id]
    )
    .then(({ rows: venues }) => {
      if (venues.length === 0) {
        return Promise.reject({ status: 404, msg: "Invalid venue" });
      }
      return venues[0];
    });
};
