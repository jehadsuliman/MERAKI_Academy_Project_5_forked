const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (req, res) => {
  const { cart } = req.body;
  const line_items = cart.map((item) => ({
    price_data: {
      currency: "jod",
      product_data: {
        name: item.title || "Unnamed Product",
        images: [item.image] || "UnPic image",
      },
      unit_amount: Math.round(item.total_price * 100), 
    },
    quantity: item.quantity || 1,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_address_collection: {
        allowed_countries: [
          "JO",
          "PS",
          "DZ",
          "BH",
          "KM",
          "DJ",
          "EG",
          "IQ",
          "LB",
          "LY",
          "MR",
          "MA",
          "OM",
          "QA",
        ],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 0,
              currency: "usd",
            },
            display_name: "Free shipping",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 5,
              },
              maximum: {
                unit: "business_day",
                value: 7,
              },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 1500,
              currency: "usd",
            },
            display_name: "Next day air",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 1,
              },
              maximum: {
                unit: "business_day",
                value: 1,
              },
            },
          },
        },
      ],
      line_items,
      mode: "payment",
      success_url: "http://localhost:5173/orderAccept",
      cancel_url: "http://localhost:5173/carts", 
    });

    res.send({ sessionId: session.id });
  } catch (error) {
    console.error("Error creating Checkout session:", error);
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  createCheckoutSession,
};
