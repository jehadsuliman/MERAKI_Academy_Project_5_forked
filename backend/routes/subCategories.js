const express = require("express");

const {
  createNewSubCategory,
  getAllSubCategories,
  getSubCategoryById,
  updateSubCategoryById,
} = require("../controllers/subCategories");
const authentication = require("../middleware/authentication");

const subCategoriesRouter = express.Router();

subCategoriesRouter.post("/", createNewSubCategory);
subCategoriesRouter.get("/",authentication, getAllSubCategories);
subCategoriesRouter.get("/:id", getSubCategoryById);
subCategoriesRouter.put("/:id", updateSubCategoryById);

module.exports = subCategoriesRouter;
