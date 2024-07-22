const { pool } = require("../models/db");

const createNewSubCategory = (req, res) => {
  const shop_id = req.token.shopId;
  const { description } = req.body;
  pool
    .query(
      `INSERT INTO sub_categories (description,shop_id) VALUES ($1, $2) RETURNING *;`,
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

    .query(`SELECT * FROM sub_categories WHERE is_deleted = 0;`)

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
  const subCategoryId = req.params.id;

  console.log(subCategoryId);
  pool
    .query(`SELECT * FROM sub_categories WHERE id = $1 AND is_deleted = 0;`, [
      subCategoryId,
    ])
    .then((result) => {
      console.log(result.rows);
      if (result.rows.length > 0) {
        res.status(200).json({
          success: true,
          message: `The sub category with id: ${subCategoryId}`,
          subCategories: result.rows[0],
        });
      } else {
        res.status(404).json({
          success: false,
          message: `The sub category with id: ${subCategoryId} not found`,
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
  const subCategoryId = req.params.id;
  const { description } = req.body;
  pool
    .query(
      `UPDATE sub_categories
    SET 
      description = COALESCE($1, description)
    WHERE id = $2
    RETURNING *;`,
      [description, subCategoryId]
    )
    .then((result) => {
      if (result.rows.length > 0) {
        res.status(200).json({
          success: true,
          message: `Sub Category with id: ${subCategoryId} updated successfully`,
          subCategories: result.rows[0],
        });
      } else {
        res.status(404).json({
          success: false,
          message: `Sub Category with id: ${subCategoryId} Not Found`,
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

const deleteSubCategoriesById = (req, res) => {
    const subCategoryId = req.params.id;
    pool.query(`UPDATE sub_categories SET is_deleted = 1 WHERE id = $1 RETURNING *;`, [subCategoryId])
    .then((result) => {
        if (result.rows.length > 0){
            res.status(200).json({
                success: true,
                message: `Sub Category with id: ${subCategoryId} deleted successfully`,
            })
        } else {
            res.status(404).json({
                success: false,
                message: `Sub Category with id: ${subCategoryId} not found`,
            })
        }
    })
    .catch((error) => {
        res.status(500).json({
            success: false,
            message: `Server Error`,
            error: error.message,
        })
    })
}

module.exports = {
  createNewSubCategory,
  getAllSubCategories,
  getSubCategoryById,
  updateSubCategoryById,
  deleteSubCategoriesById,
};
