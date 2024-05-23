const express = require("express");
const { getApi } = require("./controllers/api.controller");
const { getUsers, postUser } = require("./controllers/users-controllers");

const app = express();
app.use(express.json());

app.get("/api", getApi);

app.get("/api/users", getUsers);
app.post("/api/users", postUser);

module.exports = app;
