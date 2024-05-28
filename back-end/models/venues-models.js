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

exports.selectVenueByFixtureId = (fixture_id) => {
  return db
    .query(
      `SELECT v.venue_id, v.venue_name, v.venue_latitude, v.venue_longitude from fixtures f
      JOIN teams t ON f.team1_id = t.team_id
      JOIN venues v ON t.venue_id = v.venue_id WHERE f.fixture_id=$1;`,
      [fixture_id]
    )
    .then(({ rows: venues }) => {
      if (venues.length === 0) {
        return Promise.reject({ status: 404, msg: "Invalid venue" });
      }
      return venues[0];
    });
};
