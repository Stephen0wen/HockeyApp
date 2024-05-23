const express = require("express");
const { getApi } = require("./controllers/api.controller");
const { getUsers } = require("./controllers/users-controllers");
const { getVenues } = require("./controllers/venues-controller");
const {
  handleCustomErrors,
  handlePsqlErrors,
  handleServerErrors,
} = require("./errors/index.js");
const app = express();
app.use(express.json());

app.get("/api", getApi);

app.get("/api/users", getUsers);

app.get("/api/venues", getVenues);

app.all("*", (req, res, next) => {
  res.status(404).send({ msg: "Not Found" });
});

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app;
