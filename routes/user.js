const express = require("express");
const router = express.Router();
const userController = require("../controller/user");
const auth = require("../auth");

// Route for checkEmail.
router.post("/checkEmail", (req, res) => {
  userController
    .checkEmail(req.body)
    .then((dataFromController) => res.send(dataFromController));
});

// Route for user registration.
router.post("/register", (req, res) => {
  userController
    .signUp(req.body)
    .then((dataFromController) => res.send(dataFromController));
});

// Route for user login.
router.post("/login", (req, res) => {
  userController
    .login(req.body)
    .then((dataFromController) => res.send(dataFromController));
});

// Router for getting user's profile.
router.get("/profile", auth.verify, (req, res) => {
  const userId = auth.decode(req.headers.authorization).id;
  userController
    .findUser(userId)
    .then((dataFromController) => res.send(dataFromController));
});

module.exports = router;
