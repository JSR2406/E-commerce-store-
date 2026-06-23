require("dotenv").config();
const connectDB = require("./config/db");
const User = require("./models/User");
const Product = require("./models/Product");
const CartItem = require("./models/CartItem");
const Order = require("./models/Order");
const products = require("./data/products");

const seed = async () => {
  await connectDB();

  await Promise.all([
    User.deleteMany({}),
    Product.deleteMany({}),
    CartItem.deleteMany({}),
    Order.deleteMany({}),
  ]);

  const [adminUser, customerUser] = await User.create([
    {
      username: "artisan-admin",
      email: "admin@apparelartisan.dev",
      password: "Password123!",
      firstName: "Studio",
      lastName: "Admin",
      role: "admin",
    },
    {
      username: "amber-lee",
      email: "amber@apparelartisan.dev",
      password: "Password123!",
      firstName: "Amber",
      lastName: "Lee",
    },
  ]);

  const insertedProducts = await Product.insertMany(products);

  await CartItem.insertMany([
    {
      user: customerUser._id,
      product: insertedProducts[0]._id,
      quantity: 2,
    },
    {
      user: customerUser._id,
      product: insertedProducts[2]._id,
      quantity: 1,
    },
  ]);

  await Order.create({
    user: customerUser._id,
    items: [
      {
        product: insertedProducts[1]._id,
        name: insertedProducts[1].name,
        imageUrl: insertedProducts[1].imageUrl,
        priceAtPurchase: insertedProducts[1].price,
        quantity: 1,
      },
    ],
    subtotal: insertedProducts[1].price,
    shippingAddress: {
      fullName: "Amber Lee",
      street: "42 Market Street",
      city: "Bengaluru",
      state: "Karnataka",
      zipCode: "560001",
      country: "India",
    },
    status: "Delivered",
  });

  console.log("Seed complete");
  process.exit(0);
};

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});

