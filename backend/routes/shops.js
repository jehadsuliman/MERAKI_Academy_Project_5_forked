const express = require("express");
const {
  shopRegister,
  shopLogin,
  getAllShops,
  getShopByCategoryId,
  getShopById,
  updateShopById,
  deleteShopById,
} = require("../controllers/shops");

const shopsRouter = express.Router();

shopsRouter.post("/register", shopRegister);
shopsRouter.post("/login", shopLogin);
shopsRouter.get("/all", getAllShops);
shopsRouter.get("/:id", getShopById);
shopsRouter.get("/category/:id", getShopByCategoryId);
shopsRouter.put("/Update/:id", updateShopById);
shopsRouter.delete("/shop/:shopId", deleteShopById);

module.exports = shopsRouter;
