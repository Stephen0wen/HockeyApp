const teamsRouter = require("express").Router();
const teamsController = require("../controllers/teams-controllers");

teamsRouter.get("/", teamsController.getTeams);

module.exports = teamsRouter;
