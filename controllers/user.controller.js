// -----------------------
// TODO: 
//  - Update only pass
//  - JSON Web Token
// -----------------------

const User = require("../models/user.model.js");
const crypto = require("crypto");

// Constants for encrypt password
const iterations = 10000;
const keylen = 64;
const digest = process.env.DIGEST_PASSWORD || "sha256";

exports.register = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "The request cannot be empty!",
    });
  }

  // Check for asynchrony with await and async to avoid callback hell
  User.findByEmail(req.body.email, (err, data) => {
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
        digest,
        (err, key) => {
          const encryptedPassword = key.toString("base64");
          // Create a new User
          const user = new User({
            name: req.body.name,
            lastname: req.body.lastname,
            email: req.body.email,
            password: encryptedPassword,
            salt: newSalt,
          });
          User.create(user, (err, data) => {
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

  User.findByEmail(req.body.email, (err, data) => {
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
      digest,
      (err, key) => {
        const encryptedPassword = key.toString("base64");
        if (data.password === encryptedPassword) {
          return res.send({ token: "token" }); // In the fututre we'll send a JSON Web Token
        }
        return res.status(404).send({
          message: `Incorrect username or password`,
        });
      }
    );
  });
};

exports.findOne = (req, res) => {
  // Change this when JSON web token
  User.findById(req.body.id_user, (err, data) => {
    if (err) {
      console.log(err);
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

  // console.log(req.body);
  // Change this when JSON web token
  User.updateById(req.body.id_user, new User(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({
          message: `User with id ${req.body.id_user} not found.`,
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
  // Change this when JSON web token
  User.remove(req.body.id_user, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `User with id ${req.body.id_user} not found.`,
        });
      } else {
        res.status(500).send({
          message: `Cannot delete User with id ${req.body.id_user}.`,
        });
      }
    } else res.send({ message: `User deleted successfully!` });
  });
};
