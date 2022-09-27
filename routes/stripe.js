const express = require("express");
const Stripe = require("stripe");
require("dotenv").config();
const stripe = Stripe(process.env.STRIPE_KEY);
const router = express.Router();

router.post("/create-checkout-session", async (req, res) => {
  const customer = await stripe.customers.create({
    metadata: {
      userId: req.body.userId,
      // cart: JSON.stringify(req.body.cartItems),
    },
  });

  const data = [
    {
      name: "PG-DAC",
      images:
        "https://res.cloudinary.com/dpzyuycb9/image/upload/v1658683328/cdac_htjnmr.png",
      desc: "PG-DAC Fees PAYMENT",
      id: "pgdacpaymentportal123",
      price: 500,
      qty: 1,
    },
  ];

  const line_items = data.map((item) => {
    return {
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
          images: [item.images],
          description: item.desc,
          metadata: {
            id: item.id,
          },
        },
        unit_amount: item.price * 100,
      },
      quantity: item.qty,
    };
  });

  //   const line_itemss = req.body.cartItems.map((item) => {
  //     return {
  //       price_data: {
  //         currency: "usd",
  //         product_data: {
  //           name: item.name,
  //           images: [item.image.url],
  //           description: item.desc,
  //           metadata: {
  //             id: item.id,
  //           },
  //         },
  //         unit_amount: item.price * 100,
  //       },
  //       quantity: item.cartQuantity,
  //     };
  //   });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    

    phone_number_collection: {
      enabled: true,
    },
    customer: customer.id,
    line_items,
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/checkout-failure`,
  });
  res.send({ url: session.url });
  // console.log(session);
});

module.exports = router;


// success_url: `${process.env.CLIENT_URL}/checkout-success`,
// cancel_url: `${process.env.CLIENT_URL}/checkout-failure`,