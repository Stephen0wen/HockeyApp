const fixturesRouter = require("express").Router();
const { getTeamsheet } = require("../controllers/teamsheet-controller");
const {
  getFixtures,
  getFixturesById,
  patchFixtureById,
} = require("../controllers/fixtures.controller");

fixturesRouter.get("/", getFixtures);

fixturesRouter.get("/:fixture_id", getFixturesById);

fixturesRouter.get("/:fixture_id/teamsheet/:team_id", getTeamsheet);

fixturesRouter.patch("/:fixture_id", patchFixtureById);

module.exports = fixturesRouter;
