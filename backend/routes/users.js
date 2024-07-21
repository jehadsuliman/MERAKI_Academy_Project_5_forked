const express = require("express");
const { userRegister, userLogin, getAllUsers } = require("../controllers/users");



const usersRouter = express.Router();

usersRouter.post("/register", userRegister);
usersRouter.post("/login", userLogin);
usersRouter.get("/", getAllUsers);



module.exports = usersRouter;
