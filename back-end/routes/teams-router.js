const teamsRouter = require("express").Router();
const { getTeams, getTeamById } = require("../controllers/teams-controllers");

teamsRouter.get("/", getTeams);

teamsRouter.get("/:team_id", getTeamById);

module.exports = teamsRouter;
