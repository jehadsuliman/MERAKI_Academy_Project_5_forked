const { pool } = require("../models/db");

const createNewProduct = (req, res) => {
  const { title, description, price, image, sub_category_id } = req.body;
  pool
    .query(
      `INSERT INTO products (title,description,price,image,sub_category_id) VALUES ($1, $2,$3,$4,$5) RETURNING *;`,
      [title, description, price, image, sub_category_id]
    )
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Product created successfully",
        Product: result.rows[0],
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

const getAllProducts = (req, res) => {
  pool
    .query(`SELECT * FROM products WHERE is_deleted=0 ;`)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "All the products",
        products: result.rows,
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
const getProductById = (req, res) => {
  const productId = req.params.id;
  pool
    .query(
      `
      SELECT * FROM products WHERE id = $1 AND is_deleted = 0;`,
      [productId]
    )
    .then((result) => {
      if (result.rows.length > 0) {
        res.status(200).json({
          success: true,
          message: `The Product with id: ${productId}`,
          product: result.rows,
        });
      } else {
        res.status(404).json({
          success: false,
          message: `The product: ${productId} has not a found`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        error: err,
      });
    });
};
const getProductBySubCategoryById = (req, res) => {
  const subCategoryId = req.params.id;
  pool
    .query(
      `
      SELECT * FROM products WHERE sub_category_id = $1 AND is_deleted = 0;`,
      [subCategoryId]
    )
    .then((result) => {
      if (result.rows.length > 0) {
        res.status(200).json({
          success: true,
          message: `The Product with subCategoryId: ${subCategoryId}`,
          product: result.rows,
        });
      } else {
        res.status(404).json({
          success: false,
          message: `The product with subCategoryId:${subCategoryId} has not a found`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        error: err,
      });
    });
};
const updateProductById = (req, res) => {
  const productId = req.params.id;
  const { title, description, price, image, sub_category_id } = req.body;
  pool
    .query(
      `UPDATE products
SET title = COALESCE($1,title) ,description = COALESCE($2, description),price = COALESCE($3,price) , image = COALESCE($4,image) , sub_category_id = COALESCE($5,sub_category_id)
WHERE id=$6 AND is_deleted = 0  RETURNING *;`,
      [title, description, price, image, sub_category_id, productId]
    )
    .then((result) => {
      if (result.rows.length > 0) {
        res.status(200).json({
          success: true,
          message: `Product with id: ${productId} updated successfully`,
          Category: result.rows[0],
        });
      } else {
        res.status(404).json({
          success: false,
          message: `The Product: ${productId} has not a found`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        error: err,
      });
    });
};
const deleteProductById = (req, res) => {
  const productId = req.params.id;
  pool
    .query("UPDATE products SET is_deleted =1 WHERE id = $1;", [productId])
    .then((result) => {
      res.status(200).json({
        success: true,
        message: `Product with id: ${productId} deleted successfully`,
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
  createNewProduct,
  getAllProducts,
  getProductById,
  getProductBySubCategoryById,
  updateProductById,
  deleteProductById,
};
