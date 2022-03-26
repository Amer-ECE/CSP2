const User = require("../models/user");
const bcrypt = require("bcrypt");
const auth = require("../auth");

// Checking Email
module.exports.checkEmail = (body) => {
  return User.find({ email: body.email }).then((data) => {
    if (data.length > 0) {
      return true;
    } else {
      return false;
    }
  });
};

// User Registration.
module.exports.signUp = async (body) => {
  const newUser = new User({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    phoneNum: body.phoneNum,
    password: bcrypt.hashSync(body.password, 10),
  });

  return newUser.save().then((user, err) => {
    if (err) {
      return false;
    } else {
      return true;
    }
  });
};

// Login user.
module.exports.login = (body) => {
  return User.findOne({ email: body.email }).then((data) => {
    if (data === null) {
      return false;
    } else {
      const isPasswordCorrect = bcrypt.compareSync(
        body.password,
        data.password
      );

      if (isPasswordCorrect) {
        return { accessToken: auth.createAccessToken(data.toObject()) };
      } else {
        return false;
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
