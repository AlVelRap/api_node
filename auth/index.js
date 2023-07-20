const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { JWT_SECRET } = require("../constants");

const isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.sendStatus(403);
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.sendStatus(403);
    }
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
