const express = require("express");
const { shopRegister, shopLogin, getAllShops, getShopByCategoryId, getShopById, updateShopById } = require("../controllers/shops");



const shopsRouter = express.Router();

shopsRouter.post("/register", shopRegister);
shopsRouter.post("/login", shopLogin);
shopsRouter.get("/", getAllShops);
shopsRouter.get("/:id", getShopById);
shopsRouter.get("/:id/category", getShopByCategoryId);
shopsRouter.put("/:id", updateShopById);










module.exports = shopsRouter;
