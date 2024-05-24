const express = require("express");
const { getApi } = require("./controllers/api.controller");

const {
  getUsers,
  postUser,
  patchUserById,
  getUserById,
} = require("./controllers/users-controllers");
const { getLeagueTables } = require("./controllers/league_tables.controller");
const { getFixtures } = require("./controllers/fixtures.controller.js");
const { getVenues, getVenueById } = require("./controllers/venues-controller");

const {
    handleCustomErrors,
    handlePsqlErrors,
    handleServerErrors,
} = require("./errors/index.js");
const { getTeams } = require("./controllers/teams-controllers.js");

const app = express();
app.use(express.json());

app.get("/api", getApi);

app.get("/api/users", getUsers);
app.post("/api/users", postUser);


app.patch("/api/users/:user_id", patchUserById);

app.get("/api/users/:user_id", getUserById);


app.get("/api/league_tables", getLeagueTables);

app.get("/api/venues", getVenues);
app.get("/api/venues/:venue_id", getVenueById);

app.get("/api/teams", getTeams);

app.get("/api/fixtures", getFixtures);

app.all("*", (req, res, next) => {
    res.status(404).send({ msg: "Not Found" });
});

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app;
