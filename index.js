const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const orderRoute = require("./routes/order");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
// Server setup.
const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());

// Connect to mongoDB.
mongoose.connect(process.env.MONGODB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => console.log("Connected to mongoDB."));

// Import routes
app.use("/users", userRoute);
app.use("/products", productRoute);
app.use("/orders", orderRoute);

// Listen to the server.
const port = 5000;
app.listen(process.env.PORT || port, () => {
  console.log(`Server is running at port ${port}`);
});
