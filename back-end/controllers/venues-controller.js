const { selectVenues } = require("../models/venues-models");

exports.getVenues = (request, response, next) => {
  selectVenues()
    .then((venues) => {
      response.status(200).send({ venues });
    })
    .catch(next);
};
