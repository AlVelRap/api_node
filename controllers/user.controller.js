// -----------------------
// TODO:
//  - Update only pass
//  - Move Register and Login data access logic to the service
// -----------------------

const User = require("../models/user.model.js");
const userService = require("../services/user.service.js");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const {
  JWT_SECRET,
  DIGEST_PASSWORD,
  JWT_LIFE,
  JWT_ALGORITHM,
} = require("../constants");

// Constants for encrypt password
const iterations = 10000;
const keylen = 64;

// Function for token
const signToken = (_id) => {
  return jwt.sign({ _id }, JWT_SECRET, {
    algorithm: JWT_ALGORITHM,
    expiresIn: JWT_LIFE,
  });
};

exports.register = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "The request cannot be empty!",
    });
  }

  // Check for asynchrony with await and async to avoid callback hell

  userService.findByEmail(req.body.email, (err, data) => {
    if (data) {
      return res.status(400).send({
        // Check this HTTP Code
        message: "User already exists.",
      });
    }
    // Create salt
    crypto.randomBytes(16, (err, saltBytes) => {
      const newSalt = saltBytes.toString("base64");
      // Encrypt password
      crypto.pbkdf2(
        req.body.password,
        newSalt,
        iterations,
        keylen,
        DIGEST_PASSWORD,
        (err, key) => {
          const encryptedPassword = key.toString("base64");

          const user = {
            name: req.body.name,
            lastname: req.body.lastname,
            email: req.body.email,
            password: encryptedPassword,
            salt: newSalt,
          };

          userService.create(user, (err, data) => {
            if (err)
              return res.status(500).send({
                message:
                  err.message || "An error occurred while creating the user.",
              });
            else res.send(data);
          });
        }
      );
    });
  });
};

exports.login = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: `The request cannot be empty!`,
    });
  }

  userService.findByEmail(req.body.email, (err, data) => {
    if (!data) {
      return res.status(404).send({
        message: `Incorrect username or password`,
      });
    }
    crypto.pbkdf2(
      req.body.password,
      data.salt,
      iterations,
      keylen,
      DIGEST_PASSWORD,
      (err, key) => {
        const encryptedPassword = key.toString("base64");
        if (data.password === encryptedPassword) {
          const token = signToken(data.id_user);
          return res.send({ token });
        }
        return res.status(404).send({
          message: `Incorrect username or password`,
        });
      }
    );
  });
};

exports.findOne = (req, res) => {
  userService.findById(req.user.id_user, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `User with id ${req.user.id_user} not found.`,
        });
      } else {
        res.status(500).send({
          message: "Error when receiving the User with id " + req.user.id_user,
        });
      }
    } else {
      res.send({
        nombre: data.name,
        apellidos: data.lastname,
        email: data.email,
      });
    }
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "The request cannot be empty!",
    });
  }
  // This update dont update id_user, password or salt
  req.body.id_user = req.user.id_user;
  req.body.password = req.user.password;
  req.body.salt = req.user.salt;

  userService.updateById(req.user.id_user, new User(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({
          message: `User with id ${req.user.id_user} not found.`,
        });
      } else {
        return res.status(500).send({
          message: "Error when updating the User with id " + req.user.id_user,
        });
      }
    } else {
      return res.send({
        nombre: data.name,
        apellidos: data.lastname,
        email: data.email,
      });
    }
  });
};

exports.delete = (req, res) => {
  userService.remove(req.user.id_user, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `User with id ${req.user.id_user} not found.`,
        });
      } else {
        res.status(500).send({
          message: `Cannot delete User with id ${req.user.id_user}.`,
        });
      }
    } else res.send({ message: `User deleted successfully!` });
  });
};
