const { json } = require("express");

const router = require("express").Router();
const KEY = process.env.STRIPE_KEY
const Stripe = require("stripe")(KEY);

router.post("/payment", async(req, res) => {
  let status, erorr
  const {token, amount} =req.body
  try {
    await Stripe.charges.create({
      source:token.id,
      amount,
      currency:"usd"
    })
    status = "success"
  }catch (err) {
    console.log(err);
    status = "Failure"
  }
  res.json({erorr, status})
});

module.exports = router;