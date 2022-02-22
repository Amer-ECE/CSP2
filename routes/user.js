const express = require("express");
const router = express.Router();
const userController = require("../controller/user");
const auth = require("../auth");

// Route for checkEmail.
router.post("/checkEmail", (req, res) => {
    userController.checkEmail(req.body).then(dataFromController => res.send(dataFromController));
});

// Route for user registration.
router.post("/signUp", (req, res) => {
    userController.signUp(req.body).then(dataFromController => res.send(dataFromController));
});

// Route for user login.
router.post("/login", (req, res) => {
    userController.login(req.body).then(dataFromController => res.send(dataFromController));
});


module.exports = router;