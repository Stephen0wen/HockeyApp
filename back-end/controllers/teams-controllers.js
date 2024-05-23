const { selectTeams } = require("../models/teams-models");

exports.getTeams = (request, response, next) => {
  selectTeams()
    .then((teams) => {
      response.status(200).send({ teams });
    })
    .catch(next);
};
