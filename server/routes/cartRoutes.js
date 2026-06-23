const express = require("express");
const CartItem = require("../models/CartItem");
const Product = require("../models/Product");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

const populateCart = (query) => query.populate("product", "name price imageUrl category stockQuantity rating");

router.get("/", protect, async (req, res, next) => {
  try {
    const cart = await populateCart(
      CartItem.find({ user: req.user._id }).sort({ updatedAt: -1 })
    );
    res.json(cart);
  } catch (error) {
    next(error);
  }
});

router.post("/", protect, async (req, res, next) => {
  try {
    const { productId, quantity = 1 } = req.body;

    if (!productId || quantity < 1) {
      return res.status(400).json({ message: "productId and a positive quantity are required" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const current = await CartItem.findOne({ user: req.user._id, product: productId });
    const nextQuantity = Math.min((current?.quantity || 0) + Number(quantity), product.stockQuantity);

    const cartItem = await CartItem.findOneAndUpdate(
      { user: req.user._id, product: productId },
      { user: req.user._id, product: productId, quantity: nextQuantity },
      { upsert: true, new: true, runValidators: true }
    );

    await cartItem.populate("product", "name price imageUrl category stockQuantity rating");
    res.status(201).json(cartItem);
  } catch (error) {
    next(error);
  }
});

router.put("/:itemId", protect, async (req, res, next) => {
  try {
    const { quantity } = req.body;
    if (quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    const cartItem = await CartItem.findOne({ _id: req.params.itemId, user: req.user._id });
    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    const product = await Product.findById(cartItem.product);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    cartItem.quantity = Math.min(Number(quantity), product.stockQuantity);
    await cartItem.save();
    await cartItem.populate("product", "name price imageUrl category stockQuantity rating");
    res.json(cartItem);
  } catch (error) {
    next(error);
  }
});

router.delete("/:itemId", protect, async (req, res, next) => {
  try {
    const deleted = await CartItem.findOneAndDelete({ _id: req.params.itemId, user: req.user._id });
    if (!deleted) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.json({ message: "Cart item removed" });
  } catch (error) {
    next(error);
  }
});

router.delete("/", protect, async (req, res, next) => {
  try {
    await CartItem.deleteMany({ user: req.user._id });
    res.json({ message: "Cart cleared" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

