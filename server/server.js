require("dotenv").config();
const connectDB = require("./config/db");
const app = require("./app");

connectDB();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
