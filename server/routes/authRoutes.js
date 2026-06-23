const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

const createToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });

router.post("/register", async (req, res, next) => {
  try {
    const { username, email, password, firstName, lastName } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "username, email, and password are required" });
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      username,
      email,
      password,
      firstName,
      lastName,
    });

    return res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      token: createToken(user._id),
    });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    return res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      token: createToken(user._id),
    });
  } catch (error) {
    next(error);
  }
});

router.get("/me", protect, async (req, res) => {
  res.json(req.user);
});

router.put("/me", protect, async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.username = req.body.username ?? user.username;
    user.email = req.body.email ?? user.email;
    user.firstName = req.body.firstName ?? user.firstName;
    user.lastName = req.body.lastName ?? user.lastName;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updated = await user.save();
    res.json({
      _id: updated._id,
      username: updated.username,
      email: updated.email,
      firstName: updated.firstName,
      lastName: updated.lastName,
      role: updated.role,
      token: createToken(updated._id),
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

