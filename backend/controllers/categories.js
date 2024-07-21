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
const getCategoryById = (req, res) => {
  const categoryId = req.params.id;
  pool
    .query(
      `
      SELECT * FROM categories WHERE id = $1 AND is_deleted = 0;`,
      [categoryId]
    )
    .then((result) => {
      if (result.rows.length > 0) {
        res.status(200).json({
          success: true,
          massage: `The category with id: ${categoryId}`,
          article: result.rows,
        });
      } else {
        res.status(404).json({
          success: false,
          massage: `The category: ${categoryId} has not a found`,
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
const updateCategoryById = (req, res) => {
  const categoryId = req.params.id;
  const { name, image } = req.body;
  pool
    .query(
      `UPDATE categories
SET name = COALESCE($1,name) ,image = COALESCE($2, image)
WHERE id=$3 AND is_deleted = 0  RETURNING *;`,
      [name, image, categoryId]
    )
    .then((result) => {
      if (result.rows.length > 0) {
        res.status(200).json({
          success: true,
          massage: `Category with id: ${categoryId} updated successfully`,
          Category: result.rows[0],
        });
      } else {
        res.status(404).json({
          success: false,
          massage: `The Category: ${categoryId} has not a found`,
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
const deleteCategoryById = (req, res) => {
  const categoryId = req.params.id;
  pool
    .query("UPDATE categories SET is_deleted =1 WHERE id = $1;", [categoryId])
    .then((result) => {
      res.status(200).json({
        success: true,
        massage: `Category with id: ${categoryId} deleted successfully`,
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
  getCategoryById,
  updateCategoryById,
  deleteCategoryById
};
