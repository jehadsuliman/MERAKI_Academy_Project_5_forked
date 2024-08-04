const bcrypt = require("bcrypt");
const { pool } = require("../models/db");
const jwt = require("jsonwebtoken");
const saltRounds = parseInt(process.env.SALT);

const userRegister = async (req, res) => {
  const {
    userName,
    email,
    password,
    country,
    age,
    firstName,
    lastName,
    city,
    address,
    postal_code,
    role_id,
  } = req.body;

  const encryptedPassword = await bcrypt.hash(password, saltRounds);

  const query = `INSERT INTO users (userName, email, password, country, age, firstName, lastName, city, address, postal_code, role_id) 
                    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *`;

  const data = [
    userName,
    email.toLowerCase(),
    encryptedPassword,
    country,
    age,
    firstName,
    lastName,
    city,
    address,
    postal_code,
    role_id,
  ];

  pool
    .query(query, data)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "Account created successfully",
        result: result.rows[0],
      });
    })
    .catch((err) => {
      if (err.code === "23505") {
        res.status(409).json({
          success: false,
          message: "The email already exists",
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Server error",
          error: err.message,
        });
      }
    });
};

const userLogin = (req, res) => {
  const { email, password } = req.body;
  const query = `SELECT * FROM users WHERE email = $1 `;
  const data = [email.toLowerCase()];
  pool
    .query(query, data)
    .then((result) => {
      if (result.rows.length) {
        bcrypt.compare(password, result.rows[0].password, (err, response) => {
          if (err) res.json(err);
          if (response) {
            const payload = {
              userId: result.rows[0].id,
              country: result.rows[0].country,
              role: result.rows[0].role_id,
            };
            const options = { expiresIn: "1d" };
            const secret = process.env.SECRET;
            const token = jwt.sign(payload, secret, options);
            if (token) {
              return res.status(200).json({
                token,
                success: true,
                message: `Valid login credentials`,
                userId: result.rows[0].id,
                role: result.rows[0].role_id,
              });
            } else {
              throw Error;
            }
          } else {
            res.status(403).json({
              success: false,
              message: `The email doesn’t exist or the password you’ve entered is incorrect`,
            });
          }
        });
      } else throw Error;
    })
    .catch((err) => {
      res.status(403).json({
        success: false,
        message:
          "The email doesn’t exist or the password you’ve entered is incorrect",
        err,
      });
    });
};

const getAllUsers = (req, res) => {
  const query = `SELECT * FROM users WHERE users.is_deleted=0 `;

  pool
    .query(query)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "All the users",
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        error: err.message,
      });
    });
};

const getUserById = (req, res) => {
  const { id } = req.params;

  const query = `SELECT * FROM users  WHERE id = $1 AND is_deleted=0`;
  const data = [id];

  pool
    .query(query, data)
    .then((result) => {
      if (result.rows.length !== 0) {
        res.status(200).json({
          success: true,
          message: `The user with id: ${id}`,
          result: result.rows[0],
        });
      } else {
        res.status(404).json({
          success: false,
          message: `The user with id: ${id} not found`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

const updateUserById = (req, res) => {
  const { id } = req.params;
  let {
    userName,
    email,
    password,
    country,
    age,
    firstName,
    lastName,
    city,
    address,
    postal_code,
    profile_pic,
  } = req.body;

  const query = `
      UPDATE users
      SET userName = COALESCE($1, userName),
          firstName = COALESCE($2, firstName),
          lastName = COALESCE($3, lastName),
          email = COALESCE($4, email),
          password = COALESCE($5, password),
          age = COALESCE($6, age),
          country = COALESCE($7, country),
          city = COALESCE($8, city),
          address = COALESCE($9, address),
          postal_code = COALESCE($10, postal_code),
          profile_pic = COALESCE($11, profile_pic)
      WHERE id = $12 AND is_deleted = 0
      RETURNING *;
    `;

  const data = [
    userName || null,
    firstName || null,
    lastName || null,
    email || null,
    password || null,
    age || null,
    country || null,
    city || null,
    address || null,
    postal_code || null,
    profile_pic || null,
    id,
  ];

  pool
    .query(query, data)
    .then((result) => {
      if (result.rows.length > 0) {
        res.status(200).json({
          success: true,
          message: `User info with id: ${id} updated successfully`,
          result: result.rows[0],
        });
      } else {
        res.status(404).json({
          success: false,
          message: `User with id: ${id} not found`,
        });
      }
    })
    .catch((err) => {
      if (err.code === "23505") {
        // Unique constraint violation (e.g., duplicate email)
        res.status(400).json({
          success: false,
          message: "Failed to update user info",
          error: err.detail,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Server error",
          error: err,
        });
      }
    });
};

const deleteUserById = (req, res) => {
  const { id } = req.params;
  const query = `UPDATE users SET is_deleted=1 WHERE id=$1;`;
  const data = [id];
  pool
    .query(query, data)
    .then((result) => {
      if (result.rowCount !== 0) {
        res.status(200).json({
          success: true,
          message: `User with id: ${id} deleted successfully`,
        });
      } else {
        throw new Error("Error happened while deleting user");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

module.exports = {
  userRegister,
  userLogin,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
