const router = require("express").Router()
const Comment = require("../models/Comment")


// Create
router.post("/", async (req, res) => {
  const newComment = new Comment(req.body);
  try {
    const saveComment = await newComment.save();
    res.status(200).json(saveComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json("Comment has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get user
router.get("/find/:id", async( req, res) => {
  try { 
    const comment = await Comment.find({productId: req.params.id})
    res.status(200).json(comment)
  }catch(err) {
    res.status(500).json(err)
  }
})

// Get All user
router.get("/", async( req, res) => {
  try { 
    const comment = await Comment.find()
    res.status(200).json(comment)
  }catch(err) {
    res.status(500).json(err)
  }
})
module.exports = router;
