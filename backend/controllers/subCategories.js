const { pool } = require("../models/db");

const createNewSubCategory = (req, res) => {
  const { description, shop_id } = req.body;
  pool
    .query(
      `INSERT INTO sub_categories (description, shop_id) VALUES ($1, $2) RETURNING *;`,
      [description, shop_id]
    )
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Sub category created successfully",
        result: result.rows[0],
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

const getAllSubCategories = (req, res) => {
  pool
    .query(`SELECT * FROM sub_categories;`)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "All the sub categories",
        categories: result.rows,
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
  createNewSubCategory,
  getAllSubCategories,
};
