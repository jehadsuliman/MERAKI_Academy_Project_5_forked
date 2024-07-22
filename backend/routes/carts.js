const express = require("express");

const {
  createNewCart,
  getCartById,
  updateCartById,
  deleteCartById,
} = require("../controllers/carts");
const authentication = require("../middleware/authentication");
const cartsRouter = express.Router();

cartsRouter.post("/", authentication, createNewCart);
cartsRouter.get("/:id", getCartById);
cartsRouter.put("/:id", updateCartById);
cartsRouter.delete("/:id", deleteCartById);

module.exports = cartsRouter;
