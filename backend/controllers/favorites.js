const { pool } = require("../models/db");

const addToFavorites = (req, res) => {
  const { product_id } = req.body;
  const user_id = req.token.userId;

  if (!user_id) {
    return res.status(401).json({
      success: false,
      message: `The token is ${user_id}`,
    });
  }
  pool
    .query(`SELECT * FROM favorite WHERE product_id = $1 AND user_id = $2`, [
      product_id,
      user_id,
    ])
    .then((result) => {
      if (result.rows.length > 0) {
        res.status(200).json({
          success: true,
          message: "Product already in favorites",
        });
      } else {
        pool
          .query(
            `INSERT INTO favorite (product_id, user_id) VALUES ($1, $2) RETURNING *`,
            [product_id, user_id]
          )
          .then((result) => {
            res.status(201).json({
              success: true,
              message: "Product added to favorites successfully",
              favorite: result.rows[0],
            });
          })
          .catch((error) => {
            res.status(500).json({
              success: false,
              message: "Server error",
              err: error.message,
            });
          });
      }
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: error.message,
      });
    });
};

const getFavorites = (req, res) => {
  const user_id = req.token.userId;
  if (!user_id) {
    return res.status(401).json({
      success: false,
      message: `The token is ${user_id}`,
    });
  }
  pool
    .query(
      `SELECT products.* FROM favorite 
         JOIN products ON favorite.product_id = products.id 
         WHERE favorite.user_id = $1 AND favorite.is_deleted = 0`,
      [user_id]
    )
    .then((result) => {
      res.status(200).json({
        success: true,
        favorites: result.rows,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: error.message,
      });
    });
};

const deleteFavorite = (req, res) => {
  const { product_id } = req.body;
  const user_id = req.token.userId;
  if (!user_id) {
    return res.status(401).json({
      success: false,
      message: `The token is ${user_id}`,
    });
  }
  pool
    .query(
      `DELETE FROM favorite WHERE product_id = $1 AND user_id = $2 RETURNING *`,
      [product_id, user_id]
    )
    .then((result) => {
      if (result.rowCount === 0) {
        res.status(404).json({
          success: false,
          message: "Favorite not found",
        });
      }
      res.status(200).json({
        success: true,
        message: "Product delete favorite successfully",
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: error.message,
      });
    });
};

module.exports = {
    addToFavorites,
    getFavorites,
    deleteFavorite,
  };
  