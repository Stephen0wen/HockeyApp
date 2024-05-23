const { selectVenues, selectVenueById } = require("../models/venues-models");

exports.getVenues = (request, response, next) => {
  selectVenues()
    .then((venues) => {
      response.status(200).send({ venues });
    })
    .catch(next);
};

exports.getVenueById = (request, response, next) => {
  const { venue_id } = request.params;
  selectVenueById(venue_id)
    .then((venue) => {
      response.status(200).send({ venue });
    })
    .catch(next);
};
