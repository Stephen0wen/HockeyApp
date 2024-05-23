const { fetchFixturesById } = require("../models/fixtures_byId.model.js");

const getFixturesById = (req, res, next) => {
  const { fixture_id } = req.params;
  fetchFixturesById(fixture_id)
    .then((fixture) => res.status(200).send({ fixture }))
    .catch((err) => {
      if (err.status && err.message) {
        res.status(err.status).send({ message: err.message });
      }
      next(err);
    });
};

module.exports = { getFixturesById };
