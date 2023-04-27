const router = require("express").Router()
const Complaint = require("../models/Comp")


// Create
router.post("/", async (req, res) => {
  const newComplaint = new Complaint(req.body);
  try {
    const saveComplaint = await newComplaint.save();
    res.status(200).json(saveComplaint);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  try {
    await Complaint.findByIdAndDelete(req.params.id);
    res.status(200).json("Complaint has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get user
router.get("/find/:id", async( req, res) => {
  try { 
    const complaint = await Complaint.find({productId: req.params.id})
    res.status(200).json(complaint)
  }catch(err) {
    res.status(500).json(err)
  }
})

// Get All user
router.get("/", async( req, res) => {
  try { 
    const complaint = await Complaint.find()
    res.status(200).json(complaint)
  }catch(err) {
    res.status(500).json(err)
  }
})
module.exports = router;
