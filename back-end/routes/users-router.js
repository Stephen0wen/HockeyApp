const usersRouter = require("express").Router();
const {
  getUsers,
  postUser,
  patchUserById,
  getUserById,
  deleteUserByUserId,
} = require("../controllers/users-controllers");

usersRouter.get("/", getUsers);

usersRouter.post("/", postUser);

usersRouter.patch("/:user_id", patchUserById);

usersRouter.get("/:user_id", getUserById);

usersRouter.delete("/:user_id", deleteUserByUserId);

module.exports = usersRouter;
