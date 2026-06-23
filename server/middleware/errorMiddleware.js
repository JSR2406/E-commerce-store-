const notFound = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  const response = {
    message: err.message,
  };

  if (process.env.NODE_ENV !== "production") {
    response.stack = err.stack;
  }

  if (err.name === "CastError") {
    res.status(400).json({ message: "Invalid resource id" });
    return;
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || "field";
    res.status(400).json({ message: `Duplicate field value entered for ${field}` });
    return;
  }

  if (err.name === "ValidationError") {
    res.status(400).json({
      message: Object.values(err.errors)
        .map((item) => item.message)
        .join(", "),
    });
    return;
  }

  res.status(statusCode).json(response);
};

module.exports = { notFound, errorHandler };

