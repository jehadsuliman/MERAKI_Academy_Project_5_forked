const express = require("express");
const { shopRegister, shopLogin, getAllShops } = require("../controllers/shops");



const shopsRouter = express.Router();

shopsRouter.post("/register", shopRegister);
shopsRouter.post("/login", shopLogin);
shopsRouter.get("/", getAllShops);






module.exports = shopsRouter;
