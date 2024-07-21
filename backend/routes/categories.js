const express = require("express");

const {
  createNewCategory,
  getAllCategories,
} = require("../controllers/categories");
const authentication = require("../middleware/authentication");
const categoriesRouter = express.Router();

categoriesRouter.post("/", authentication, createNewCategory);
categoriesRouter.get("/", getAllCategories);
module.exports = categoriesRouter;