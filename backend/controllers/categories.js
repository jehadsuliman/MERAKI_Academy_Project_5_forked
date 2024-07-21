const { pool } = require("../models/db");
const createNewCategory = (req, res) => {
  const { name, image } = req.body;
  const user_id = req.token.userId;
  pool
    .query(
      `INSERT INTO categories (name,image,user_id)VALUES ($1, $2,$3) RETURNING *;`,
      [name, image, user_id]
    )
    .then((result) => {
      res.status(201).json({
        success: true,
        massage: "Category created successfully",
        Category: result.rows[0],
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
const getAllCategories = (req, res) => {
  pool
    .query(`SELECT * FROM categories WHERE is_deleted=0 ;`)
    .then((result) => {
      res.status(200).json({
        success: true,
        massage: "All the categories",
        categories: result.rows,
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
  createNewCategory,
  getAllCategories,
};
