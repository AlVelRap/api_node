// -----------------------
// TODO:
//  - Update only pass
// -----------------------

const userService = require("../services/user.service.js");

exports.register = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "The request cannot be empty!",
    });
  }

  // Check for asynchrony with await and async to avoid callback hell
  userService.register(req.body, (err, data) => {
    if (err) {
      return res.status(500).send(err);
    }
    userResponse = {
      id_user: data.id_user,
      name: data.name,
      lastname: data.lastname,
      email: data.email,
      updatedAt: data.updatedAt,
      createdAt: data.createdAt,
    };
    return res.send(userResponse);
  });
};

exports.login = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: `The request cannot be empty!`,
    });
  }

  userService.login(req.body, (err, data) => {
    if (err) {
      return res.status(404).send(err);
    }
    return res.send(data);
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

  userService.updateById(req.user.id_user, req.body, (err, data) => {
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
