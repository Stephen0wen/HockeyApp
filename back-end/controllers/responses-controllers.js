const {
    insertResponse,
    fetchResponsesByUserId,
} = require("../models/responses-models");
const { selectUserById } = require("../models/users-models");

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
        .then((responses) => {
            if (responses.length) {
                res.status(200).send({ responses });
            }
            return selectUserById(user_id);
        })
        .then(() => {
            res.status(200).send({ responses: [] });
        })
        .catch(next);
};
