const usersRouter = require("express").Router();
const usersController = require("../controllers/users-controllers");

usersRouter.get("/", usersController.getUsers);

usersRouter.post("/", usersController.postUser);

usersRouter.patch("/:user_id", usersController.patchUserById);

usersRouter.get("/:user_id", usersController.getUserById);

usersRouter.delete("/:user_id", usersController.deleteUserByUserId);

module.exports = usersRouter;
