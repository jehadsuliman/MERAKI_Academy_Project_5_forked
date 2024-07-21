const express = require("express");

const {
  createNewCategory,
  getAllCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById
} = require("../controllers/categories");
const authentication = require("../middleware/authentication");
const categoriesRouter = express.Router();

categoriesRouter.post("/", authentication, createNewCategory);
categoriesRouter.get("/", getAllCategories);
categoriesRouter.get("/:id", getCategoryById);
categoriesRouter.put("/:id", updateCategoryById);
categoriesRouter.delete("/:id", deleteCategoryById);



module.exports = categoriesRouter;
