const express = require("express");
const router = express.Router();
const orderController = require("../controller/order");
const auth = require("../auth");

// router for Adding new order.
router.post("/", (req, res) => {
    orderController.addOrder(req.body).then(dataFromController => res.send(dataFromController));
});

// Route for getting user's orders.
router.get("/myOrders/:userId", auth.verify, (req, res) => {
    if (auth.decode(req.headers.authorization).id === req.params.userId){
        orderController.getMyOrders(req.params.userId).then(dataFromController => res.send(dataFromController));
    } else {
        res.send("Something went wrong");
    };
});

// Router for getting all user's orders (Admin Only).
router.get("/allOrders", auth.verify, (req, res) => {
    if (auth.decode(req.headers.authorization).isAdmin) {
        orderController.getAllOrders().then(dataFromController => res.send(dataFromController));
    } else {
        res.send("Admin only can process to this page.");
    };
});

// Router for user's cancellation request.
router.put("/cancel/:orderId", (req, res) => {
    if ({status: "Pending"}) {
        orderController.cancelRequest(req.params.orderId).then(dataFromController => res.send(dataFromController));
    } else {
        res.send("Order has been Shipped.. Cannot send cancellation request.");
    };
});

// Router for checking all cancellation requests (Admin Only).
router.get("/checkCancellation", (req, res) => {
    if (auth.decode(req.headers.authorization).isAdmin) {
        orderController.checkCancellationRequests().then(dataFromController => res.send(dataFromController));
    } else {
        req.send("Something went wrong");
    };
});

// Route to Confirm cancellation requests (Admin Only).

module.exports = router;