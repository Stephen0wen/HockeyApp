const fixturesRouter = require("express").Router();
const fixturesController = require("../controllers/fixtures.controller");
const fixturesByIdController = require("../controllers/fixtures_byId.controller");

fixturesRouter.get("/", fixturesController.getFixtures);

fixturesRouter.get("/:fixture_id", fixturesByIdController.getFixturesById);

module.exports = fixturesRouter;
