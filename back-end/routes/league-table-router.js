const leagueTableRouter = require("express").Router();
const { getLeagueTables } = require("../controllers/league_tables.controller");

leagueTableRouter.get("/", getLeagueTables);

module.exports = leagueTableRouter;
