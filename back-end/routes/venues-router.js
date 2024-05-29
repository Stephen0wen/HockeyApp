const venuesRouter = require("express").Router();
const {
  getVenues,
  getVenueById,
  getVenueByFixtureId,
} = require("../controllers/venues-controller");

venuesRouter.get("/", getVenues);

venuesRouter.get("/:venue_id", getVenueById);

venuesRouter.get("/:fixture_id/venue", getVenueByFixtureId);

module.exports = venuesRouter;
