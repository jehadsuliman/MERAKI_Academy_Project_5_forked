const express = require("express");

const { createNewSubCategory } = require("../controllers/subCategories");

const subCategoriesRouter = express.Router();

subCategoriesRouter.post("/", createNewSubCategory);

module.exports = subCategoriesRouter;
