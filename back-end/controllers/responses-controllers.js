const { insertResponse } = require("../models/responses-models");

exports.putResponse = (req, res, next) => {
  const { body } = req;
  insertResponse(body)
    .then((response) => {
      res.status(201).send({ response });
    })
    .catch(next);
};
