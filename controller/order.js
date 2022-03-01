const req = require("express/lib/request");
const Order = require("../models/order");

// Add user's orders.
module.exports.addOrder = (body) => {
  let newOrder = new Order({
    userId: body.userId,
    products: body.products,
    address: body.address,
    totalAmount: body.totalAmount,
  });

  return newOrder.save().then((order, err) => {
    if (err) {
      return "Something Went Wrong";
    } else {
      return "Your order has been successfully created";
    }
  });
};

// Get user's orders.
module.exports.getMyOrders = (userId) => {
  return Order.find({ userId: userId }).then((data) => {
    return data;
  });
};

// Get all user's orders (Admin Only).
module.exports.getAllOrders = () => {
  return Order.find({}).then((data) => {
    return data;
  });
};

// Order Cancellation Request.
module.exports.cancelRequest = (orderId) => {
  let cancelRequest = {
    status: "Waiting to confirm cancellation",
  };

  return Order.findByIdAndUpdate(orderId, cancelRequest).then((data, err) => {
    if (err) {
      return "Failed";
    } else {
      return "Cancellation request has been sent...";
    }
  });
};

// Check all user's order cancellation.
module.exports.checkCancellationRequests = () => {
  return Order.find({ status: "Waiting to confirm cancellation" }).then(
    (data) => {
      return data;
    }
  );
};

// Confirm cancellation.
module.exports.confirmCancellation = (orderId) => {
  let confirmCancellation = {
    status: "Canceled",
  };
  return Order.findByIdAndUpdate(orderId, confirmCancellation).then(
    (data, err) => {
      if (err) {
        return "Something went wrong";
      } else {
        return "cancellation has been confirmed.";
      }
    }
  );
};
