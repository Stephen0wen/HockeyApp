const responsesRouter = require("express").Router();
const {
  putResponse,
  getResponsesByUserId,
} = require("../controllers/responses-controllers");

responsesRouter.get("/:user_id", getResponsesByUserId);
responsesRouter.put("/", putResponse);

module.exports = responsesRouter;
