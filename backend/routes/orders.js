const express = require("express");

const {
  createNewOrder,
  getAllOrders,
  getOrderById,
} = require("../controllers/orders");

const ordersRouter = express.Router();

const authentication = require("../middleware/authentication");

ordersRouter.post("/", authentication, createNewOrder);
ordersRouter.get("/", getAllOrders);
ordersRouter.get("/:id", getOrderById);

module.exports = ordersRouter;
