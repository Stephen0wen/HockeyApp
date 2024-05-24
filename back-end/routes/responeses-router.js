const responsesRouter = require("express").Router();
const { putResponse } = require("../controllers/responses-controllers");

responsesRouter.put("/", putResponse);

module.exports = responsesRouter;
