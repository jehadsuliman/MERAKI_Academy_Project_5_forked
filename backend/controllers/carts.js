const { pool } = require("../models/db");

const createNewCart = (req, res) => {
const user_id =req.token.userId
  const {product_id,quantity,total_price} = req.body;
  pool
    .query(
      `INSERT INTO carts (product_id,user_id,quantity,total_price) VALUES ($1, $2,$3,$4) RETURNING *;`,
      [product_id,user_id,quantity,total_price]
    )
    .then((result) => {
      res.status(201).json({
        success: true,
        massage: "carts created successfully",
        carts: result.rows[0],
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        massage: "Server error",
        error: err,
      });
    });
};

const getCartById = (req, res) => {
  const cartsId = req.params.id;
  pool
    .query(
      `
      SELECT * FROM carts WHERE id = $1 AND is_deleted = 0;`,
      [cartsId]
    )
    .then((result) => {
      if (result.rows.length > 0) {
        res.status(200).json({
          success: true,
          massage: `The carts with id: ${cartsId}`,
          carts: result.rows,
        });
      } else {
        res.status(404).json({
          success: false,
          massage: `The carts: ${cartsId} has not a found`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        massage: "Server error",
        error: err,
      });
    });
};

const updateCartById = (req, res) => {
  const cartsId = req.params.id;
  const { product_id,quantity,total_price } = req.body;
  pool
    .query(
      `UPDATE carts
SET product_id = COALESCE($1,product_id) ,quantity = COALESCE($2, quantity),total_price = COALESCE($3,total_price) 
WHERE id=$4 AND is_deleted = 0  RETURNING *;`,
      [product_id,quantity,total_price , cartsId]
    )
    .then((result) => {
      if (result.rows.length > 0) {
        res.status(200).json({
          success: true,
          massage: `carts with id: ${cartsId} updated successfully`,
          carts: result.rows[0],
        });
      } else {
        res.status(404).json({
          success: false,
          massage: `The carts: ${cartsId} has not a found`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        massage: "Server error",
        error: err,
      });
    });
};
const deleteCartById = (req, res) => {
  const cartsId = req.params.id;
  pool
    .query("UPDATE carts SET is_deleted =1 WHERE id = $1;", [cartsId])
    .then((result) => {
      res.status(200).json({
        success: true,
        massage: `carts with id: ${cartsId} deleted successfully`,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        massage: "Server error",
        error: err,
      });
    });
};

module.exports = {
  createNewCart,
  getCartById,
  updateCartById,
  deleteCartById,
};
