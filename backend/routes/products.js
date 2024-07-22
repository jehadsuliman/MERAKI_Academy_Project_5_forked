const express = require("express");

const { createNewProduct, getAllProducts } = require("../controllers/products");
const authentication = require("../middleware/authentication");
const productsRouter = express.Router();

productsRouter.post("/", authentication, createNewProduct);
productsRouter.get("/", getAllProducts);

module.exports = productsRouter;
