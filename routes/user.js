const express = require("express");
const User = require("../models/user");
const router = express.Router();

// Create new user.
router.post("/", (req, res) => {
    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    });

    newUser.save().then((user, err) => {
        if (err) {
            res.send(false);
        } else {
            res.send(true);
        };
    });
});

// Get all users
router.get("/", (req, res) => {
    return User.findOne({}).then(data => res.send(data));
});

module.exports = router;