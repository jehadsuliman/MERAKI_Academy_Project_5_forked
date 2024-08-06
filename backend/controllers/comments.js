const { pool } = require("../models/db");

const createNewComment = (req, res) => {
  const { product_id, comment } = req.body;
  const userId = req.token.userId;
  if (!userId) {
    return res.status(401).json({
      success: false,
      message: `The token is ${userId}`,
    });
  }
  pool
    .query(
      `INSERT INTO comment_rate (product_id, user_id, comment) VALUES ($1, $2,$3) RETURNING *`,
      [product_id, userId, comment]
    )
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "comment created successfully",
        comment: result.rows[0],
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

const getCommentsByProductId = (req, res) => {
  const productId = req.params.id;
  pool
    .query(
      `SELECT * FROM comment_rate WHERE product_id = $1 AND is_deleted = 0;`,
      [productId]
    )
    .then((result) => {
      res.status(200).json({
        success: true,
        message: `Comments for product with ID: ${productId}`,
        comments: result.rows,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        error: error.message,
      });
    });
};

const updateComment = (req, res) => {
  const commentId = req.params.id;
  const { comment, rating } = req.body;
  pool
    .query(
      `UPDATE comment_rate SET comment = COALESCE($1,comment) ,rating  = COALESCE($2, rating )WHERE id = $3 AND is_deleted = 0;`,
      [comment, rating, commentId]
    )
    .then((result) => {
      res.status(200).json({
        success: true,
        message: `Comments with ID: ${commentId}`,
        comments: result.rows[0],
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        error: error.message,
      });
    });
};

const deleteComment = (req, res) => {
  const commentId = req.params.id;
  pool
    .query(
      `UPDATE comment_rate
      SET is_deleted = 1
      WHERE id = $1 AND is_deleted = 0
      RETURNING *;`,
      [commentId]
    )
    .then((result) => {
      if (result.rows.length > 0) {
        res.status(200).json({
          success: true,
          message: `comment with id: ${commentId} deleted successfully`,
        });
      } else {
        res.status(404).json({
          success: false,
          message: `Order with id: ${orderId} not found`,
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        error: error.message,
      });
    });
};

module.exports = {
  createNewComment,
  getCommentsByProductId,
  updateComment,
  deleteComment,
};
