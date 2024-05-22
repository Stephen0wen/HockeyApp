const express = require("express");
const app = express();
const { getLeagueTables } = require("./controllers/league-tables-controllers");

app.get("/api/league_tables", getLeagueTables);

module.exports = app;
