const fixturesRouter = require("express").Router();
const {
  getFixtures,
  patchFixturesById,
} = require("../controllers/fixtures.controller");
const { getFixturesById } = require("../controllers/fixtures_byId.controller");

fixturesRouter.get("/", getFixtures);

fixturesRouter.get("/:fixture_id", getFixturesById);

fixturesRouter.patch("/:fixture_id", patchFixturesById);

module.exports = fixturesRouter;
