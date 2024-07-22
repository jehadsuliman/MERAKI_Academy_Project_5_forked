const express = require("express");

const { createNewProduct } = require("../controllers/products");
const authentication = require("../middleware/authentication");
const productsRouter = express.Router();

productsRouter.post("/", authentication, createNewProduct);

module.exports = productsRouter;
