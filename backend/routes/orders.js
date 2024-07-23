const express = require("express");

const { createNewOrder } = require("../controllers/orders");

const ordersRouter = express.Router();

const authentication = require("../middleware/authentication");

ordersRouter.post("/", authentication, createNewOrder);

module.exports = ordersRouter;
