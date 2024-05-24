const fixturesRouter = require("express").Router();
const { getFixtures } = require("../controllers/fixtures.controller");
const { getFixturesById } = require("../controllers/fixtures_byId.controller");
const { getTeamsheet } = require("../controllers/teamsheet-controller");

fixturesRouter.get("/", getFixtures);

fixturesRouter.get("/:fixture_id", getFixturesById);

fixturesRouter.get("/:fixture_id/teamsheet/:team_id", getTeamsheet);

module.exports = fixturesRouter;
