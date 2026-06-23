const express = require("express");
const CartItem = require("../models/CartItem");
const Order = require("../models/Order");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, async (req, res, next) => {
  try {
    const { shippingAddress } = req.body;

    if (!shippingAddress?.fullName || !shippingAddress?.street) {
      return res.status(400).json({ message: "shippingAddress is required" });
    }

    const cartItems = await CartItem.find({ user: req.user._id }).populate("product");
    if (!cartItems.length) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const items = cartItems.map((item) => ({
      product: item.product._id,
      name: item.product.name,
      imageUrl: item.product.imageUrl,
      priceAtPurchase: item.product.price,
      quantity: item.quantity,
    }));

    const subtotal = items.reduce((sum, item) => sum + item.priceAtPurchase * item.quantity, 0);

    const order = await Order.create({
      user: req.user._id,
      items,
      subtotal,
      shippingAddress,
    });

    await CartItem.deleteMany({ user: req.user._id });
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
});

router.get("/", protect, async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort("-createdAt");
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", protect, async (req, res, next) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, user: req.user._id });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

