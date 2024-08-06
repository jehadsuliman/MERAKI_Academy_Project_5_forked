const express = require("express");

const {
    createAddress,
    getAddressesByUserId,
    deleteAddress,
} = require("../controllers/address");

const addressRouter = express.Router();

const authentication = require("../middleware/authentication");

addressRouter.post("/", authentication, createAddress);
addressRouter.get("/:id", getAddressesByUserId);
addressRouter.delete("/:id", deleteAddress);


module.exports = addressRouter;
