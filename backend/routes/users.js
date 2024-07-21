const express = require("express");
const { userRegister, userLogin, getAllUsers, getUserById } = require("../controllers/users");



const usersRouter = express.Router();

usersRouter.post("/register", userRegister);
usersRouter.post("/login", userLogin);
usersRouter.get("/", getAllUsers);
usersRouter.get("/:id", getUserById);





module.exports = usersRouter;
