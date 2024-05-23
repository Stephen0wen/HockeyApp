const { selectAllFixtures } = require("../models/fixtures.model");

exports.getFixtures = (request, response, next) => {
    selectAllFixtures(request.query).then((fixtures) => {
        response.status(200).send({ fixtures });
    });
};
