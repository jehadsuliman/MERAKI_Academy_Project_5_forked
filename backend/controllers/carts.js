const { pool } = require("../models/db");

const createNewCart = (req, res) => {
  const user_id = req.token.userId;
  const { product_id, quantity, total_price } = req.body;
  pool
    .query(
      `INSERT INTO carts (product_id,user_id,quantity,total_price) VALUES ($1, $2,$3,$4) RETURNING *;`,
      [product_id, user_id, quantity, total_price]
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
  const product_id = req.params.id;

  const { quantity, total_price } = req.body;
  pool
    .query(
      `UPDATE carts
SET quantity = COALESCE($1, quantity),total_price = COALESCE($2,total_price) 
WHERE product_id=$3 AND is_deleted = 0  RETURNING *;`,
      [quantity, total_price, product_id]
    )
    .then((result) => {
      if (result.rows.length > 0) {
        res.status(200).json({
          success: true,
          massage: `carts with id: ${product_id} updated successfully`,
          carts: result.rows[0],
        });
      } else {
        res.status(404).json({
          success: false,
          massage: `The carts: ${product_id} has not a found`,
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

const getAllCartsByUserId = (req, res) => {
  const user_id = req.token.userId;
  console.log(user_id);
  pool
    .query(
      `SELECT carts.*, 
       users.*, 
       products.*
FROM carts
JOIN users ON carts.user_id = users.id
JOIN products ON carts.product_id = products.id
WHERE carts.user_id = $1 AND carts.is_deleted = 0;`,
      [user_id]
    )
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "all carts for user",
        carts: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        error: err,
      });
    });
};
const deleteCartByUserId = (req, res) => {
  const userId = req.params.id;

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "User ID is missing",
    });
  }

  pool
    .query(
      `UPDATE carts SET is_deleted = 1 WHERE user_id = $1 AND is_deleted = 0;`,
      [userId]
    )
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "All carts for user marked as deleted",
      });
    })
    .catch((err) => {
      console.error("Error updating carts:", err);
      res.status(500).json({
        success: false,
        message: "Server error",
        error: err,
      });
    });
};

const deleteProductByUserId = (req, res) => {
  const productId = req.params.id;
  const userId = req.token.userId;
  pool
    .query(
      `UPDATE carts SET is_deleted =1 WHERE id = $1 AND user_id =$2 returning*`,
      [productId, userId]
    )
    .then((result) => {
      res.status(200).json({
        success: true,
        message: `Product with id: ${productId} deleted successfully`,
        rs: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        error: err,
      });
    });
};

module.exports = {
  createNewCart,
  getCartById,
  updateCartById,
  getAllCartsByUserId,
  deleteCartByUserId,
  deleteProductByUserId,
};
