const express = require("express");
const {
  handleCustomErrors,
  handlePsqlErrors,
  handleServerErrors,
} = require("./errors/index.js");

const {
  getResponsesByUserId,
} = require("./controllers/responses-byUserId.controller.js");
const apiRouter = require("./routes/api-router");

const app = express();
app.use(express.json());

app.use("/api", apiRouter);

app.get("/api/responses/:user_id", getResponsesByUserId);

app.all("*", (req, res, next) => {
  res.status(404).send({ msg: "Not Found" });
});

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app;
