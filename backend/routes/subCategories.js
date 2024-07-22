const express = require("express");

const {
  createNewSubCategory,
  getAllSubCategories,
} = require("../controllers/subCategories");

const subCategoriesRouter = express.Router();

subCategoriesRouter.post("/", createNewSubCategory);
subCategoriesRouter.get("/", getAllSubCategories);

module.exports = subCategoriesRouter;
