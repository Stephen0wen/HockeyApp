const express = require("express");
const { getApi } = require("./controllers/api.controller");
const { getUsers } = require("./controllers/users-controllers");
const { getLeagueTables } = require("./controllers/league_tables.controller");

const app = express();
app.use(express.json());

app.get("/api", getApi);

app.get("/api/users", getUsers);

app.get("/api/league_tables", getLeagueTables);

module.exports = app;
