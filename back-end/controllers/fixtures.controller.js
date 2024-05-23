const { selectAllFixtures } = require("../models/fixtures.model");

exports.getFixtures = (request, response, next) => {
    selectAllFixtures().then((fixtures) => {
        response.status(200).send({ fixtures });
    });
};
