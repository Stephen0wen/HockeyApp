const responsesRouter = require("express").Router();
const {
  getResponsesByUserId,
} = require("../controllers/responses-byUserId.controller");
const { putResponse } = require("../controllers/responses-controllers");

responsesRouter.get("/:user_id", getResponsesByUserId);
responsesRouter.put("/", putResponse);

module.exports = responsesRouter;
