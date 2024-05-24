const responsesRouter = require("express").Router();
const {
  getResponsesByUserId,
} = require("../controllers/responses-byUserId.controller");

responsesRouter.get("/:user_id", getResponsesByUserId);

module.exports = responsesRouter;
