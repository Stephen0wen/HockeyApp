const { selectTeamsheet } = require("../models/teamsheet-model");

exports.getTeamsheet = (request, response, next) => {
    const { fixture_id, team_id } = request.params;

    selectTeamsheet(fixture_id, team_id)
        .then((teamsheet) => {
            response.status(200).send({ teamsheet });
        })
        .catch((error) => {
            next(error);
        });
};
