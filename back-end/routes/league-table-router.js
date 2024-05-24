const leagueTableRouter = require("express").Router();
const leagueTableController = require("../controllers/league_tables.controller");

leagueTableRouter.get("/", leagueTableController.getLeagueTables);

module.exports = leagueTableRouter;
