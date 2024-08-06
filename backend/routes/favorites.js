const express = require("express");

const {
  addToFavorites,
  getFavorites,
  deleteFavorite,
} = require("../controllers/favorites");

const favoritesRouter = express.Router();

const authentication = require("../middleware/authentication");

favoritesRouter.post("/", authentication, addToFavorites);
favoritesRouter.get("/", authentication, getFavorites);
favoritesRouter.delete("/", authentication, deleteFavorite);

module.exports = favoritesRouter;
