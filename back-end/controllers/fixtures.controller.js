const {
  selectAllFixtures,
  updateFixtureById,
} = require("../models/fixtures.model");

exports.getFixtures = (request, response, next) => {
  selectAllFixtures(request.query).then((fixtures) => {
    response.status(200).send({ fixtures });
  });
};

exports.patchFixturesById = (request, response, next) => {
  const { fixture_id } = request.params;
  const { body } = request;
  updateFixtureById(fixture_id, body)
    .then((fixture) => {
      response.status(200).send({ fixture });
    })
    .catch(next);
};
