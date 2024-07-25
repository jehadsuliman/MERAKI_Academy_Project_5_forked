const bcrypt = require("bcrypt");
const { pool } = require("../models/db");
const jwt = require("jsonwebtoken");
const saltRounds = parseInt(process.env.SALT);

const shopRegister = async (req, res) => {
  const {
    shopName,
    country,
    phone_number,
    email,
    password,
    category_id,
    role_id,
  } = req.body;

  const encryptedPassword = await bcrypt.hash(password, saltRounds);

  const query = `INSERT INTO shops (shopName, country, phone_number, email, password, category_id, role_id) 
                    VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`;

  const data = [
    shopName,
    country,
    phone_number,
    email.toLowerCase(),
    encryptedPassword,
    category_id,
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

const shopLogin = (req, res) => {
  const { email, password } = req.body;
  const query = `SELECT * FROM shops WHERE email = $1`;
  const data = [email.toLowerCase()];
  pool
    .query(query, data)
    .then((result) => {
      if (result.rows.length) {
        bcrypt.compare(password, result.rows[0].password, (err, response) => {
          if (err) res.json(err);
          if (response) {
            const payload = {
              shopId: result.rows[0].id,
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
                shopId: result.rows[0].id,
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

const getAllShops = (req, res) => {
  const query = `SELECT * FROM shops WHERE is_deleted=0 `;

  pool
    .query(query)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "All the shops",
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

const getShopByCategoryId = (req, res) => {
  const { id } = req.params;

  const query = `SELECT * FROM shops  WHERE category_id = $1 AND is_deleted=0`;
  const data = [id];

  pool
    .query(query, data)
    .then((result) => {
      if (result.rows.length !== 0) {
        res.status(200).json({
          success: true,
          message: `The shop with id: ${id}`,
          result: result.rows,
        });
      } else {
        res.status(404).json({
          success: false,
          message: `The shop with id: ${id} not found`,
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

const getShopById = (req, res) => {
  const { id } = req.params;

  const query = `SELECT * FROM shops  WHERE id = $1 AND is_deleted=0`;
  const data = [id];

  pool
    .query(query, data)
    .then((result) => {
      if (result.rows.length !== 0) {
        res.status(200).json({
          success: true,
          message: `The shop with id: ${id}`,
          result: result.rows[0],
        });
      } else {
        res.status(404).json({
          success: false,
          message: `The shop with id: ${id} not found`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err.message,
      });
    });
};

const updateShopById = (req, res) => {
  const { id } = req.params;
  let {
    shopName,
    country,
    email,
    password,
    category_id,
    role_id,
    discreption,
    profile_pic,
    phone_number,
  } = req.body;

  const query = `
      UPDATE shops
      SET shopName = COALESCE($1, shopName),
          country = COALESCE($2, country),
          email = COALESCE($3, email),
          password = COALESCE($4, password),
          category_id = COALESCE($5, category_id),
          role_id = COALESCE($6, role_id),
          discreption = COALESCE($7, discreption),
          phone_number = COALESCE($8, phone_number),
          profile_pic = COALESCE($9, profile_pic)
      WHERE id = $10 AND is_deleted = 0
      RETURNING *;
    `;

  const data = [
    shopName || null,
    country || null,
    email || null,
    password || null,
    category_id || null,
    role_id || null,
    discreption || null,
    profile_pic || null,
    phone_number || null,
    id,
  ];
  console.log('Executing query:', query);
  console.log('With data:', data);
  pool
    .query(query, data)
    .then((result) => {
      if (result.rows.length > 0) {
        res.status(200).json({
          success: true,
          message: `Shop info with id: ${id} updated successfully`,
          result: result.rows[0],
        });
      } else {
        res.status(404).json({
          success: false,
          message: `Shop with id: ${id} not found`,
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

const deleteShopById = (req, res) => {
  const { id } = req.params;
  const query = `UPDATE shops SET is_deleted=1 WHERE id=$1;`;
  const data = [id];
  pool
    .query(query, data)
    .then((result) => {
      if (result.rowCount !== 0) {
        res.status(200).json({
          success: true,
          message: `Shop with id: ${id} deleted successfully`,
        });
      } else {
        throw new Error("Error happened while deleting shop");
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
  shopRegister,
  shopLogin,
  getAllShops,
  getShopByCategoryId,
  getShopById,
  updateShopById,
  deleteShopById,
};
