const express = require("express");

const { createNewCategory } = require("../controllers/categories");
const authentication = require("../middleware/authentication");
const categoriesRouter = express.Router();

categoriesRouter.post("/", authentication, createNewCategory);



module.exports = categoriesRouter;
