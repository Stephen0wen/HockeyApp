const express = require("express");
const { getApi } = require("./controllers/api.controller");

const {
  getUsers,
  postUser,
  deleteUserByUserId,
} = require("./controllers/users-controllers");
const { getLeagueTables } = require("./controllers/league_tables.controller");
const { getVenues, getVenueById } = require("./controllers/venues-controller");
const {
  handleCustomErrors,
  handlePsqlErrors,
  handleServerErrors,
} = require("./errors/index.js");

const app = express();
app.use(express.json());

app.get("/api", getApi);

app.get("/api/users", getUsers);
app.post("/api/users", postUser);

app.get("/api/league_tables", getLeagueTables);

app.get("/api/venues", getVenues);
app.get("/api/venues/:venue_id", getVenueById);

app.delete("/api/users/:user_id", deleteUserByUserId);

app.all("*", (req, res, next) => {
  res.status(404).send({ msg: "Not Found" });
});

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app;
