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
        massage: "Product created successfully",
        Product: result.rows[0],
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
  createNewProduct,
};
