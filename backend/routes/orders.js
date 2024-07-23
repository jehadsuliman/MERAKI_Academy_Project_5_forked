const express = require("express");

const {
  createNewOrder,
  getAllOrders,
  getOrderById,
  updateOrderById,
  deleteOrderById,
} = require("../controllers/orders");

const ordersRouter = express.Router();

const authentication = require("../middleware/authentication");

ordersRouter.post("/", authentication, createNewOrder);
ordersRouter.get("/", getAllOrders);
ordersRouter.get("/:id", getOrderById);
ordersRouter.put("/:id", updateOrderById);
ordersRouter.delete("/:id", deleteOrderById);

module.exports = ordersRouter;
