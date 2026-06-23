const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    imageUrl: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    stockQuantity: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    artist: {
      type: String,
      trim: true,
      default: "Apparel Artisan Studio",
    },
    sizes: {
      type: [String],
      default: ["S", "M", "L", "XL"],
    },
    colors: {
      type: [String],
      default: ["Sand", "Ink", "Clay"],
    },
    rating: {
      type: Number,
      default: 4.8,
      min: 0,
      max: 5,
    },
    numReviews: {
      type: Number,
      default: 0,
      min: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);

