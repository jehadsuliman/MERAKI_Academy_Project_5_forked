const express = require("express");

const {
  createNewCart,
  getCartById,
  updateCartById,
  getAllCartsByUserId,
  deleteCartByUserId,
  deleteProductByUserId,
} = require("../controllers/carts");
const authentication = require("../middleware/authentication");
const cartsRouter = express.Router();

cartsRouter.post("/", authentication, createNewCart);
cartsRouter.get("/:id", getCartById);
cartsRouter.put("/:id", updateCartById);
cartsRouter.get("/user/:id", authentication, getAllCartsByUserId);
cartsRouter.delete("/user/:id", deleteCartByUserId);
cartsRouter.delete("/:id", authentication, deleteProductByUserId);

module.exports = cartsRouter;
