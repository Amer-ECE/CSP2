const express = require("express");
const router = express.Router();
const orderController = require("../controller/order");
const auth = require("../auth");
const Order = require("../models/order");

// router for Adding new user's order.
router.post("/", (req, res) => {
  orderController
    .addOrder(req.body)
    .then((dataFromController) => res.send(dataFromController));
});

// Route for getting user's orders.
router.get("/myOrders", auth.verify, (req, res) => {
  const userId = auth.decode(req.headers.authorization).id;
  orderController
    .getMyOrders(userId)
    .then((dataFromController) => res.send(dataFromController));
});

// Router for getting all user's orders (Admin Only).
router.get("/allOrders", auth.verify, (req, res) => {
  if (auth.decode(req.headers.authorization).isAdmin) {
    orderController
      .getAllOrders()
      .then((dataFromController) => res.send(dataFromController));
  } else {
    res.send(false);
  }
});

// Router for user's cancellation request.
router.put("/cancel/:orderId", (req, res) => {
  orderController
    .cancelRequest(req.params.orderId)
    .then((dataFromController) => res.send(dataFromController));
});

// Router for checking all cancellation requests (Admin Only).
router.get("/checkCancellation", (req, res) => {
  if (auth.decode(req.headers.authorization).isAdmin) {
    orderController
      .checkCancellationRequests()
      .then((dataFromController) => res.send(dataFromController));
  } else {
    res.send(false);
  }
});

// Route to Confirm cancellation requests (Admin Only).
router.put("/confirmCancellation/:orderId", (req, res) => {
  if (auth.decode(req.headers.authorization).isAdmin) {
    orderController
      .confirmCancellation(req.params.orderId)
      .then((dataFromController) => res.send(dataFromController));
  } else {
    res.send(false);
  }
});

module.exports = router;
