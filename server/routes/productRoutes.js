const express = require("express");
const Product = require("../models/Product");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const {
      q = "",
      category,
      sort = "-createdAt",
      page = 1,
      limit = 12,
      featured,
    } = req.query;

    const filter = {};
    if (q) {
      filter.$or = [
        { name: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
        { artist: { $regex: q, $options: "i" } },
      ];
    }

    if (category) {
      filter.category = category;
    }

    if (featured === "true") {
      filter.isFeatured = true;
    }

    const pageNumber = Math.max(Number(page) || 1, 1);
    const pageSize = Math.min(Math.max(Number(limit) || 12, 1), 50);

    const [items, total] = await Promise.all([
      Product.find(filter)
        .sort(sort)
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize),
      Product.countDocuments(filter),
    ]);

    res.json({
      items,
      page: pageNumber,
      pages: Math.ceil(total / pageSize),
      total,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/featured", async (req, res, next) => {
  try {
    const products = await Product.find({ isFeatured: true }).sort("-createdAt").limit(6);
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.post("/", protect, admin, async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", protect, admin, async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    Object.assign(product, req.body);
    const updated = await product.save();
    res.json(updated);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", protect, admin, async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await Product.deleteOne({ _id: req.params.id });
    res.json({ message: "Product removed successfully" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

