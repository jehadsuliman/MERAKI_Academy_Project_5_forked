const express = require("express");
const { shopRegister, shopLogin } = require("../controllers/shops");



const shopsRouter = express.Router();

shopsRouter.post("/register", shopRegister);
shopsRouter.post("/login", shopLogin);






module.exports = shopsRouter;
