const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const fs = require("node:fs");
const path = require("node:path");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

const allowedOrigins = new Set(
  [process.env.CLIENT_ORIGIN, "http://localhost:5173", "http://127.0.0.1:5173"]
    .filter(Boolean)
);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        callback(null, true);
        return;
      }

      if (
        allowedOrigins.has(origin) ||
        origin.endsWith(".vercel.app") ||
        origin.endsWith(".vercel.dev")
      ) {
        callback(null, true);
        return;
      }

      callback(new Error(`Origin not allowed: ${origin}`));
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

const clientBuildPath = path.resolve(__dirname, "..", "client", "dist");

if (fs.existsSync(clientBuildPath)) {
  app.use(express.static(clientBuildPath));
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });
  app.get("/", (req, res) => {
    res.sendFile(path.join(clientBuildPath, "index.html"));
  });
  app.get("*", (req, res, next) => {
    if (req.originalUrl.startsWith("/api")) {
      next();
      return;
    }

    res.sendFile(path.join(clientBuildPath, "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.json({
      message: "Apparel Artisan API",
      status: "ok",
    });
  });

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });
}

app.use(notFound);
app.use(errorHandler);

module.exports = app;
