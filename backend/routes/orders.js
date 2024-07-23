const express = require("express");

const { createNewOrder, getAllOrders } = require("../controllers/orders");

const ordersRouter = express.Router();

const authentication = require("../middleware/authentication");

ordersRouter.post("/", authentication, createNewOrder);
ordersRouter.get("/", getAllOrders);

module.exports = ordersRouter;
