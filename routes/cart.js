const router = require("express").Router()
const Cart = require("../models/Cart")
const { verifyTokenAndAdmin, verifyTokenAndAuthenticated } = require("./verifyToken")


// Create
router.post("/", verifyTokenAndAuthenticated, async (req, res) => {
  const newCart = new Cart(req.body)
  try {
    const saveCart = await newCart.save()
    res.status(200).json(saveCart)
  } catch (err) {
    res.status(500).json(err)
  }
})

// update 
router.put("/:id", verifyTokenAndAuthenticated, async (req, res) => {
  try {
    const updateCart = await Cart.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, { new: true })
    res.status(200).json(updateCart)
  } catch (err) {
    res.status(500).json(err)
  }
})


// Delete 
router.delete("/:id", verifyTokenAndAuthenticated, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id)
    res.status(200).json("Cart has been deleted")
  } catch (err) {
    res.status(500).json(err)
  }
})

// Get User Cart
router.get("/find/:userId", verifyTokenAndAuthenticated, async (req, res) => {
  try {
    const cart = await Cart.findOne({userId:req.params.userId})
    res.status(200).json(cart)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Get All Products
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find()
    res.status(200).json(carts)
  }catch (err) {
    res.status(500).json(err)
  }
})
module.exports = router