const { pool } = require("../models/db");

const createNewRole = (req, res) => {
  const { role } = req.body;

  const query = `INSERT INTO roles (role) VALUES ($1) RETURNING *`;
  const data = [role];
  pool
    .query(query, data)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Role created successfully",
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server error`,
        err: err,
      });
    });
};

module.exports = {
    createNewRole
  };
  