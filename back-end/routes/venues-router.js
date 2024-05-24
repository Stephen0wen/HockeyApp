const venuesRouter = require("express").Router();
const venuesController = require("../controllers/venues-controller");

venuesRouter.get("/", venuesController.getVenues);

venuesRouter.get("/:venue_id", venuesController.getVenueById);

module.exports = venuesRouter;
