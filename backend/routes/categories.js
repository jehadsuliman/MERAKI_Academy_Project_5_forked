const express = require("express");

const {
  createNewCategory,
  getAllCategories,
  getCategoryById,
  updateCategoryById
} = require("../controllers/categories");
const authentication = require("../middleware/authentication");
const categoriesRouter = express.Router();

categoriesRouter.post("/", authentication, createNewCategory);
categoriesRouter.get("/", getAllCategories);
categoriesRouter.get("/:id", getCategoryById);
categoriesRouter.put("/:id", updateCategoryById);


module.exports = categoriesRouter;
