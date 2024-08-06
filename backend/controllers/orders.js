const { pool } = require("../models/db");

const createNewOrder = (req, res) => {
  const { carts_id,address_id} = req.body;
  const userId = req.token.userId;
console.log(carts_id,address_id ,userId);
  if (!userId) {
    return res.status(401).json({
      success: false,
      message: `The token is ${userId}`,
    });
  }
  pool
    .query(
      `INSERT INTO orders (carts_id, user_id, address_id) VALUES ($1, $2,$3) RETURNING *`,
      [carts_id, userId,address_id]
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
const getOrdersByUserId = (req, res) => {
  const userId = req.token.userId;
  pool
    .query(`SELECT * FROM orders WHERE user_id = $1 AND is_deleted = 0;`, [userId])
    .then((result) => {
      res.status(200).json({
        success: true,
        message: `Orders for user with ID: ${userId}`,
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

module.exports = {
  createNewOrder,
  getAllOrders,
  deleteOrderById,
  getOrdersByUserId
};
