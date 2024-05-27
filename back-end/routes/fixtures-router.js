const fixturesRouter = require("express").Router();
const { getFixtures } = require("../controllers/fixtures.controller");
const {
  getFixturesById,
  patchFixtureById,
} = require("../controllers/fixtures_byId.controller");

fixturesRouter.get("/", getFixtures);

fixturesRouter.get("/:fixture_id", getFixturesById);

fixturesRouter.patch("/:fixture_id", patchFixtureById);

module.exports = fixturesRouter;
