const router = require("express").Router();
const Product = require("../models/Product");

// Create
router.post("/", async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const saveProduct = await newProduct.save();
    res.status(200).json(saveProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update
router.put("/:id", async (req, res) => {
  try {
    const updateProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get Product
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    const { password, ...others } = product._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get All Products
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  const page = req.query.page;
  const limit = req.query.limit;
  let product;
  try {
    if (qNew) {
      product = await Product.find().sort({ createdAt: -1 }).limit(5);
    } else if (qCategory) {
      product = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
      if (page && limit) {
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        product = product.slice(startIndex, endIndex);
      }
    } else if (page && limit) {
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      Resultproduct = await Product.find();
      product = Resultproduct.slice(startIndex, endIndex);
    } else {
      product = await Product.find();
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
