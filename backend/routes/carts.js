const express = require("express");

const {
  createNewCart,
  getCartById,
  updateCartById,
  deleteCartById,
  getAllCartsByUserId,
  deleteCartByUserId
} = require("../controllers/carts");
const authentication = require("../middleware/authentication");
const cartsRouter = express.Router();

cartsRouter.post("/", authentication, createNewCart);
cartsRouter.get("/:id", getCartById);
cartsRouter.put("/:id", updateCartById);
cartsRouter.delete("/:id", deleteCartById);
cartsRouter.get("/user/:id",authentication, getAllCartsByUserId);
cartsRouter.delete("/",deleteCartByUserId);

module.exports = cartsRouter;
