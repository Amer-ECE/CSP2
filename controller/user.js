const User = require("../models/user");
const bcrypt = require("bcrypt");
const auth = require("../auth");

// Checking Email
module.exports.checkEmail = (body) => {
  return User.find({ email: body.email }).then((data) => {
    if (data.length > 0) {
      return "this email has already been taken.";
    } else {
      return false;
    }
  });
};

// User Registration.
module.exports.signUp = (body) => {
  const newUser = new User({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
  });

  return newUser.save().then((user, err) => {
    if (err) {
      return false;
    } else {
      return "Your account has been successfully created.";
    }
  });
};

// Login user.
module.exports.login = (body) => {
  return User.findOne({ email: body.email }).then((data) => {
    if (data === null) {
      return "Incorrect Email or Password or Both.";
    } else {
      const isPasswordCorrect = bcrypt.compareSync(
        body.password,
        data.password
      );

      if (isPasswordCorrect) {
        return { accessToken: auth.createAccessToken(data.toObject()) };
      } else {
        return "Incorrect Email or Password or Both.";
      }
    }
  });
};

// Find user.
module.exports.findUser = (userId) => {
  return User.findById(userId).then((data) => {
    data.password = undefined;
    return data;
  });
};
