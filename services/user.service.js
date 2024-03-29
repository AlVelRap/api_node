const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;
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

exports.login = (user, result) => {
  module.exports.findByEmail(user.email, (err, data) => {
    if (!data) {
      result({ message: `Incorrect username or password` }, null);
    }
    crypto.pbkdf2(
      user.password,
      data.salt,
      iterations,
      keylen,
      DIGEST_PASSWORD,
      (err, key) => {
        const encryptedPassword = key.toString("base64");
        if (data.password === encryptedPassword) {
          const token = signToken(data.id_user);
          result(null, { token });
          return;
        }
        result({ message: `Incorrect username or password` }, null);
      }
    );
  });
};

exports.register = (newUser, result) => {
  module.exports.findByEmail(newUser.email, (err, data) => {
    if (data) {
      result({ message: "User already exists." }, null);
      return;
    }
    // Create salt
    crypto.randomBytes(16, (err, saltBytes) => {
      const newSalt = saltBytes.toString("base64");
      // Encrypt password
      crypto.pbkdf2(
        newUser.password,
        newSalt,
        iterations,
        keylen,
        DIGEST_PASSWORD,
        (err, key) => {
          const encryptedPassword = key.toString("base64");

          const user = {
            name: newUser.name,
            lastname: newUser.lastname,
            email: newUser.email,
            password: encryptedPassword,
            salt: newSalt,
          };

          module.exports.create(user, (err, data) => {
            if (err) {
              result(
                {
                  message:
                    err.message || "An error occurred while creating the user.",
                },
                null
              );
              return;
            } else result(null, data);
          });
        }
      );
    });
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
  User.update(user, { where: { id_user: id } })
    .then((num) => {
      if (num == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("user updated: ", { id_user: id, ...user });
      result(null, { id_user: id, ...user });
    })
    .catch((err) => {
      console.log("error: ", err);
      result(err, null);
      return;
    });
};

exports.remove = (id, result) => {
  User.destroy({ where: { id_user: id } })
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
