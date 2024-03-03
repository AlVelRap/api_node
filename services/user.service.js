const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;

// TODO:
// - Add exceptions for ResourceNotFoundException
// - Change all result for the correct ones

exports.create = (newUser, result) => {
  User.create(newUser)
    .then((data) => {
      console.log("user created: ", { ...data.dataValues });
      result(null, { ...data.dataValues });
    })
    .catch((err) => {
      console.log("error: ", err);
      result(err, null);
      return;
    });
};

exports.findById = (id, result) => {
  User.findByPk(id)
    .then((data) => {
      if (data) {
        console.log("user found: ", data.dataValues);
        result(null, { ...data.dataValues });
        return;
      }
      result({ kind: "not_found" }, null);
    })
    .catch((err) => {
      console.log("error: ", err);
      result(err, null);
      return;
    });
};

exports.findByEmail = (email, result) => {
  User.findOne({ where: { email: email } })
    .then((data) => {
      if (data) {
        console.log("user found: ", data.dataValues);
        result(null, { ...data.dataValues });
        return;
      }
      result({ kind: "not_found" }, null);
    })
    .catch((err) => {
      console.log("error: ", err);
      result(err, null);
      return;
    });
};

exports.updateById = (id, user, result) => {
  id = user.id;
  User.update(user, { where: { id: id } })
    .then((num) => {
      if (num == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("user updated: ", { id: id, ...user });
      result(null, { id: id, ...user });
    })
    .catch((err) => {
      console.log("error: ", err);
      result(err, null);
      return;
    });
};

exports.remove = (id, result) => {
  User.destroy({ where: { id: id } })
    .then((num) => {
      if (num == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("Erased user with id: ", id);
      result(null, num);
    })
    .catch((err) => {
      console.log("error: ", err);
      result(err, null);
      return;
    });
};
