const apiRouter = require("express").Router();
const apiController = require("../controllers/api.controller");
const usersRouter = require("./users-router");
const leagueTableRouter = require("./league-table-router");
const venuesRouter = require("./venues-router");
const teamsRouter = require("./teams-router");
const fixturesRouter = require("./fixtures-router");
const responsesRouter = require("./responses-router");

apiRouter.get("/", apiController.getApi);

apiRouter.use("/users", usersRouter);

apiRouter.use("/league_tables", leagueTableRouter);

apiRouter.use("/venues", venuesRouter);

apiRouter.use("/teams", teamsRouter);

apiRouter.use("/fixtures", fixturesRouter);

apiRouter.use("/responses", responsesRouter);

module.exports = apiRouter;
