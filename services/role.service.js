const db = require("../models");
const Role = db.role;
const User = db.user;
const Op = db.Sequelize.Op;

// TODO:
// - Add exceptions for ResourceNotFoundException
// - Improve implementation of async/await, to use a correct one. For the moment works

exports.create = async (newRole, result) => {
  await Role.create(newRole)
    .then((data) => {
      console.log("role created: ", { ...data.dataValues });
      result(null, { ...data.dataValues });
    })
    .catch((err) => {
      console.log("error: ", err);
      result(err, null);
      return;
    });
};

exports.findAll = async (name, result) => {
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  await Role.findAll({ where: condition })
    .then((data) => {
      console.log(data);
      if (data) {
        console.log(
          "role found: ",
          data.map((role) => role.dataValues)
        );
        result(
          null,
          data.map((role) => role.dataValues)
        );
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

exports.findById = async (id, result) => {
  await Role.findByPk(id)
    .then((data) => {
      if (data) {
        console.log("role found: ", data.dataValues);
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

exports.findByName = async (name, result) => {
  await Role.findOne({ where: { name: name } })
    .then((data) => {
      if (data) {
        console.log("role found: ", data.dataValues);
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

exports.updateById = async (id, role, result) => {
  await Role.update(role, { where: { id_role: id } })
    .then((num) => {
      if (num == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("role updated: ", { id_role: id, ...role });
      result(null, { id_role: id, ...role });
    })
    .catch((err) => {
      console.log("error: ", err);
      result(err, null);
      return;
    });
};

exports.remove = async (id, result) => {
  await Role.destroy({ where: { id_role: id } })
    .then((num) => {
      if (num == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("Erased role with id: ", id);
      result(null, num);
    })
    .catch((err) => {
      console.log("error: ", err);
      result(err, null);
      return;
    });
};

exports.removeAll = async (result) => {
  await Role.destroy({ where: {  },truncate:false })
    .then((num) => {
      console.log(`${num} Roles were deleted from DB.`);
      result(null, num);
    })
    .catch((err) => {
      console.log("error: ", err);
      result(err, null);
      return;
    });
};

exports.addUser = (roleId, userId, result) => {
  Role.findByPk(roleId)
    .then((role) => {
      if (!role) {
        console.log("Role not found!");
        result({ kind: "not_found" }, null);
        return;
      }
      console.log(userId);
      User.findByPk(userId).then((user) => {
        if (!user) {
          console.log("User not found!");
          result({ kind: "not_found" }, null);
          return;
        }

        role.addUser(user);
        console.log(
          `>> added User id=${user.id_user} to Role id=${role.id_role}`
        );
        result(null, user);
      });
    })
    .catch((err) => {
      console.log(">> Error while adding User to Role: ", err);
      result(err, null);
      return;
    });
};
