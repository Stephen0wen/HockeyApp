const {
  fetchResponsesByUserId,
} = require("../models/responses-byUserId.model.js");

const getResponsesByUserId = (req, res, next) => {
  const { user_id } = req.params;
  fetchResponsesByUserId(user_id)
    .then((responses) => res.status(200).send({ responses }))
    .catch(next);
};

module.exports = { getResponsesByUserId };
