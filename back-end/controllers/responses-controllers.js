const {
  insertResponse,
  fetchResponsesByUserId,
} = require("../models/responses-models");

exports.putResponse = (req, res, next) => {
  const { body } = req;
  insertResponse(body)
    .then((response) => {
      res.status(201).send({ response });
    })
    .catch(next);
};

exports.getResponsesByUserId = (req, res, next) => {
  const { user_id } = req.params;
  fetchResponsesByUserId(user_id)
    .then((responses) => res.status(200).send({ responses }))
    .catch(next);
};
