const express = require("express");
const { shopRegister } = require("../controllers/shops");



const shopsRouter = express.Router();

shopsRouter.post("/register", shopRegister);






module.exports = shopsRouter;
