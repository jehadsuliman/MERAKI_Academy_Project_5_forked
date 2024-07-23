const { pool } = require("../models/db");

const createNewOrder = (req, res) => {
  const { carts_id, user_id } = req.body;
  const userId = req.token.userId;

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: `The token is ${userId}`,
    });
  }
  pool
    .query(
      `INSERT INTO orders (carts_id, user_id) VALUES ($1, $2) RETURNING *`,
      [carts_id, user_id]
    )
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Orders created successfully",
        orders: result.rows[0],
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

const getAllOrders = (req, res) => {
  pool
    .query(`SELECT * FROM orders WHERE is_deleted = 0;`)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: `All the orders`,
        orders: result.rows,
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

const getOrderById = (req, res) => {
  const orderId = req.params.id;
  pool
    .query(`SELECT * FROM orders WHERE id = $1 AND is_deleted = 0;`, [orderId])
    .then((result) => {
      if (result.rows.length > 0) {
        res.status(200).json({
          success: true,
          message: `The order with id: ${orderId}`,
          order: result.rows[0],
        });
      } else {
        res.status(404).json({
          success: false,
          message: `The order with id: ${orderId} not found`,
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

const updateOrderById = (req, res) => {
  const orderId = req.params.id;
  const { carts_id, user_id } = req.body;

  pool
    .query(
      `UPDATE orders SET 
    carts_id = COALESCE($1, carts_id), 
    user_id = COALESCE($2, user_id) 
    WHERE id = $3 AND is_deleted = 0
    RETURNING *;`,
      [carts_id, user_id, orderId]
    )
    .then((result) => {
      if (result.rows.length > 0) {
        res.status(200).json({
          success: true,
          message: "order with id: ${id} updated successfully",
          order: result.rows[0],
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
        message: "Server error",
        err: error.message,
      });
    });
};

const deleteOrderById = (req, res) => {
  const orderId = req.params.id;
  pool
    .query(
      `UPDATE orders
      SET is_deleted = 1
      WHERE id = $1 AND is_deleted = 0
      RETURNING *;`,
      [orderId]
    )
    .then((result) => {
      if (result.rows.length > 0) {
        res.status(200).json({
          success: true,
          message: `Order with id: ${orderId} deleted successfully`,
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
  createNewOrder,
  getAllOrders,
  getOrderById,
  updateOrderById,
  deleteOrderById,
};
