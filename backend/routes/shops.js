const express = require("express");
const { shopRegister, shopLogin, getAllShops, getShopByCategoryId } = require("../controllers/shops");



const shopsRouter = express.Router();

shopsRouter.post("/register", shopRegister);
shopsRouter.post("/login", shopLogin);
shopsRouter.get("/", getAllShops);
shopsRouter.get("/:id/category", getShopByCategoryId);









module.exports = shopsRouter;
