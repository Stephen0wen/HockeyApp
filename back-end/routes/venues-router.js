const venuesRouter = require("express").Router();
const { getVenues, getVenueById } = require("../controllers/venues-controller");

venuesRouter.get("/", getVenues);

venuesRouter.get("/:venue_id", getVenueById);

module.exports = venuesRouter;
