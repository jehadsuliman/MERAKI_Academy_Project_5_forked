const bcrypt = require("bcrypt");
const { pool } = require("../models/db");
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
        role_id
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
    userRegister
};