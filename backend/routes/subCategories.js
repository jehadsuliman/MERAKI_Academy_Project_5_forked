const express = require("express");

const {
  createNewSubCategory,
  getAllSubCategories,
  getSubCategoryById,
} = require("../controllers/subCategories");

const subCategoriesRouter = express.Router();

subCategoriesRouter.post("/", createNewSubCategory);
subCategoriesRouter.get("/", getAllSubCategories);
subCategoriesRouter.get("/:id", getSubCategoryById);

module.exports = subCategoriesRouter;
