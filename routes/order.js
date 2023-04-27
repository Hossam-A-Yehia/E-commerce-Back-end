const router = require("express").Router()
const Order = require("../models/Order")
const { verifyTokenAndAdmin, verifyTokenAndAuthenticated } = require("./verifyToken")


// Create
router.post("/", async (req, res) => {
  const newOrder = new Order(req.body)
  try {
    const saveOrder = await newOrder.save()
    res.status(200).json(saveOrder)
  } catch (err) {
    res.status(500).json(err)
  }
})

// update 
router.put("/:id", async (req, res) => {
  try {
    const updateOrder = await Order.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, { new: true })
    res.status(200).json(updateOrder)
  } catch (err) {
    res.status(500).json(err)
  }
})


// Delete 
router.delete("/:id", async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id)
    res.status(200).json("Order has been deleted")
  } catch (err) {
    res.status(500).json(err)
  }
})

// Get User Order
router.get("/find/:userId", async (req, res) => {
  try {
    const Orders = await Order.find({userId:req.params.userId})
    res.status(200).json(Orders)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Get All Orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find()
    res.status(200).json(orders)
  }catch (err) {
    res.status(500).json(err)
  }
})

// Get Stats
router.get("/stats", async( req, res) => {
  const date = new Date()
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1))
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1))

  try {
    const data = await Order.aggregate([
      {$match:{createdAt:{$gte:previousMonth}}},
      {
        $project:{
        month:{$month:"$createdAt"},
        sales:"$amount"
      },
    },
    {
      $group:{
      _id:"$month",
      total:{$sum:"$sales"}
    }
  }
    ])
    res.status(200).json(data)
  }catch(err) {
    res.status(500).json(err)
  }
})

module.exports = router