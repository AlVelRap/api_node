const jwt = require("jsonwebtoken");
// const User = require("../models/user.model");
const userService = require("../services/user.service");
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
    userService.findById(decoded._id, (err, data) => {
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

const hasRoles = (permittedRoles) => (req, res, next) => {

  // Get roles
  const userRoles = req.user.roles.map((role) => role.name);
  
  // Check if any role is permitted
  const commonRole = userRoles.find((userRole) => permittedRoles.includes(userRole));
  const isPermittedRole = commonRole !== undefined;

  if (isPermittedRole) {
    return next();
  }
  res.sendStatus(403);
};

module.exports = {
  isAuthenticated,
  hasRoles,
};
