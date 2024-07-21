const express = require("express");
const { userRegister, userLogin, getAllUsers, getUserById, updateUserById, deleteUserById } = require("../controllers/users");



const usersRouter = express.Router();

usersRouter.post("/register", userRegister);
usersRouter.post("/login", userLogin);
usersRouter.get("/", getAllUsers);
usersRouter.get("/:id", getUserById);
usersRouter.put("/:id", updateUserById);
usersRouter.delete("/:id", deleteUserById);






module.exports = usersRouter;
