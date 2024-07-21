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
        role_id
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
        role_id
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
        .catch(err => {
            if (err.code === "23505") {
                res.status(409).json({
                    success: false,
                    message: "The email already exists"
                });
            } else {
                res.status(500).json({
                    success: false,
                    message: "Server error",
                    error: err.message
                });
            }
        })
};


module.exports = {
    shopRegister
};