const fixturesRouter = require("express").Router();
const { getFixtures } = require("../controllers/fixtures.controller");
const { getFixturesById } = require("../controllers/fixtures_byId.controller");

fixturesRouter.get("/", getFixtures);

fixturesRouter.get("/:fixture_id", getFixturesById);

module.exports = fixturesRouter;
