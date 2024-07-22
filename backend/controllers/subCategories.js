const { pool } = require("../models/db");
const subCategoriesRouter = require("../routes/subCategories");

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

const getSubCategoryById = (req, res) => {
  subCategoryId = req.params.id;
  console.log(subCategoryId);
  pool
    .query(`SELECT * FROM sub_categories WHERE id = $1;`, [subCategoryId])
    .then((result) => {
      if (result.rows.length > 0) {
        res.status(200).json({
          success: true,
          message: `The sub category with id: ${id}`,
          subCategories: result.rows[0],
        });
      } else {
        res.status(404).json({
          success: false,
          message: `The sub category with id: ${id} not found`,
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

const updateSubCategoryById = (req, res) => {
  subCategoryId = req.params.id;
  const { description, shop_id } = req.body;
  pool
    .query(
      `UPDATE sub_categories
    SET 
      description = COALESCE($1, description),
      shop_id = COALESCE($2, shop_id)
    WHERE id = $3
    RETURNING *;`,
      [description, shop_id, subCategoryId]
    )
    .then((result) => {
      if (result.rows.length > 0) {
        res.status(200).json({
          success: true,
          message: `Sub Category with id: ${id} updated successfully`,
          subCategories: result.rows[0],
        });
      } else {
        res.status(404).json({
          success: false,
          message: `Sub Category with id: ${id} Not Found`,
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

module.exports = {
  createNewSubCategory,
  getAllSubCategories,
  getSubCategoryById,
  updateSubCategoryById,
};
