const { selectTeams, selectTeamById } = require("../models/teams-models");

exports.getTeams = (request, response, next) => {
    selectTeams()
        .then((teams) => {
            response.status(200).send({ teams });
        })
        .catch(next);
};

exports.getTeamById = (request, response, next) => {
    const { team_id } = request.params;
    selectTeamById(team_id)
        .then((team) => {
            response.status(200).send({ team });
        })
        .catch((error) => {
            next(error);
        });
};
