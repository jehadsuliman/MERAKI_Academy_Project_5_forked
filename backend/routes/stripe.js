const express = require("express");
const { createCheckoutSession } = require("../controllers/stripe");
const stripeRouter = express.Router();

stripeRouter.post("/create-checkout-session", createCheckoutSession);

module.exports = stripeRouter;