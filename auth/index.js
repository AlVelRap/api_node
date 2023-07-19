const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

// Constants
const secret = process.env.JWT_SECRET || "my-secret";

const isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.sendStatus(403);
  }

  jwt.verify(token, secret, (err, decoded) => {
    User.findById(decoded._id, (err, data) => {
      if (err) {
        return res.sendStatus(403);
      }
      if (data) {
        req.user = data;
        next();
      }
    });
  });
};

module.exports = {
  isAuthenticated,
};
