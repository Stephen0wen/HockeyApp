const {
  selectUsers,
  insertUser,
  updateUserById,
} = require("../models/users-models");

exports.getUsers = (request, response, next) => {
  selectUsers()
    .then((users) => {
      response.status(200).send({ users });
    })
    .catch(next);
};

exports.postUser = (request, response, next) => {
  const { body } = request;
  insertUser(body)
    .then((user) => {
      response.status(201).send({ user });
    })
    .catch(next);
};

exports.patchUserById = (request, response, next) => {
  const { user_id } = request.params;
  const { body } = request;
  updateUserById(user_id, body)
    .then((user) => {
      response.status(200).send({ user });
    })
    .catch(next);
};
