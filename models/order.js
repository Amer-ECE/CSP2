const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  products: [
    {
      productId: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      imageUrl: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
    },
  ],
  status: {
    type: String,
    default: "Pending",
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  orderedOn: {
    type: Date,
    default: Date(),
  },
});

module.exports = mongoose.model("Order", orderSchema);
