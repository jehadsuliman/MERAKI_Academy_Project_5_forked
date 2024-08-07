const { pool } = require("../models/db");

const createAddress = (req, res) => {
  const {
    first_name,
    last_name,
    address,
    city,
    country,
    postal_code,
    address_type,
  } = req.body;
  const userId = req.token.userId;
  if (!userId) {
    return res.status(401).json({
      success: false,
      message: `The token is ${userId}`,
    });
  }

  pool
    .query(
      `INSERT INTO shipping_address (first_name, last_name, address, city, country, postal_code, address_type, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [
        first_name,
        last_name,
        address,
        city,
        country,
        postal_code,
        address_type,
        userId,
      ]
    )
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Address created successfully",
        address: result.rows[0],
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
const getAddressesByUserId = (req, res) => {
  const userId = req.token?.userId;

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: 'User ID not found in token',
    });
  }

  pool
    .query(
      `SELECT * FROM shipping_address WHERE user_id = $1 AND is_deleted = 0`,
      [userId]
    )
    .then((result) => {
      res.status(200).json({
        success: true,
        message: `Address for user with ID: ${userId}`,
        address: result.rows,
      });
    })
    .catch((error) => {
      console.error('Error fetching addresses:', error); 
      res.status(500).json({
        success: false,
        message: `Server Error`,
        error: error.message,
      });
    });
};

const deleteAddress = (req, res) => {
  const addressId = req.params.id;
  pool
    .query(`UPDATE shipping_address SET is_deleted = 1 WHERE id = $1 RETURNING *`, [
      addressId,
    ])
    .then((result) => {
      if (result.rows.length > 0) {
        res.status(200).json({
          success: true,
          message: `Address with id: ${addressId} deleted successfully`,
        });
      } else {
        res.status(404).json({
          success: false,
          message: `Address with id: ${addressId} not found`,
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
  createAddress,
  getAddressesByUserId,
  deleteAddress,
};
