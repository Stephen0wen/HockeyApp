const {
  selectAllFixtures,
  fetchFixturesById,
  updateFixtureById,
} = require("../models/fixtures.model");

exports.getFixtures = (request, response, next) => {
  selectAllFixtures(request.query)
    .then((fixtures) => {
      response.status(200).send({ fixtures });
    })
    .catch(next);
};

exports.getFixturesById = (req, res, next) => {
  const { fixture_id } = req.params;
  fetchFixturesById(fixture_id)
    .then((fixture) => res.status(200).send({ fixture }))
    .catch(next);
};

exports.patchFixtureById = (req, res, next) => {
  const { fixture_id } = req.params;
  const { body } = req;
  updateFixtureById(fixture_id, body)
    .then((fixture) => res.status(200).send({ fixture }))
    .catch(next);
};
