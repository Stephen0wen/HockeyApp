const fixturesRouter = require("express").Router();
const { getFixtures } = require("../controllers/fixtures.controller");
const { getTeamsheet } = require("../controllers/teamsheet-controller");
const {
  getFixturesById,
  patchFixtureById,
} = require("../controllers/fixtures_byId.controller");

fixturesRouter.get("/", getFixtures);

fixturesRouter.get("/:fixture_id", getFixturesById);

fixturesRouter.get("/:fixture_id/teamsheet/:team_id", getTeamsheet);

fixturesRouter.patch("/:fixture_id", patchFixtureById);


module.exports = fixturesRouter;
