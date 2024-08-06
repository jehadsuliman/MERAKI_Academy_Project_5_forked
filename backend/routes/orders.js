const express = require("express");

const {
  createNewOrder,
  getAllOrders,
  deleteOrderById,
  getOrdersByUserId
} = require("../controllers/orders");

const ordersRouter = express.Router();

const authentication = require("../middleware/authentication");

ordersRouter.post("/", authentication, createNewOrder);
ordersRouter.get("/", getAllOrders);
ordersRouter.delete("/:id", deleteOrderById);
ordersRouter.get("/user",authentication, getOrdersByUserId);

module.exports = ordersRouter;
