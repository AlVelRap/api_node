module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    name: {
      type: Sequelize.STRING(64),
      allowNull: false,
    },
    lastname: {
      type: Sequelize.STRING(64),
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    salt: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return User;
};

// const conn = require("../db_connection");

// // constructor
// const User = function (user) {
//   this.id_user = user.id_user;
//   this.name = user.name;
//   this.lastname = user.lastname;
//   this.email = user.email;
//   this.password = user.password;
//   this.salt = user.salt;
// };

// User.create = (newUser, result) => {
//   conn.query("INSERT INTO user SET ?", newUser, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(err, null);
//       return;
//     }

//     console.log("user created: ", { id_user: res.insertId, ...newUser });
//     result(null, { id_user: res.insertId, ...newUser });
//   });
// };

// User.findById = (id, result) => {
//   conn.query(`SELECT * FROM user WHERE id_user = ?`, [id], (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(err, null);
//       return;
//     }

//     if (res.length) {
//       console.log("user found: ", res[0]);
//       result(null, res[0]);
//       return;
//     }

//     result({ kind: "not_found" }, null);
//   });
// };

// User.findByEmail = (email, result) => {
//   conn.query(`SELECT * FROM user WHERE email = ?`, [email], (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(err, null);
//       return;
//     }

//     if (res.length) {
//       console.log("user found: ", res[0]);
//       result(null, res[0]);
//       return;
//     }

//     result({ kind: "not_found" }, null);
//   });
// };

// User.updateById = (id, user, result) => {
//   conn.query(
//     "UPDATE user SET name = ?, lastname = ?, email = ?, password = ?, salt = ? WHERE id_user = ?",
//     [
//       user.name,
//       user.lastname,
//       user.email,
//       user.password,
//       user.salt,
//       id,
//     ],
//     (err, res) => {
//       if (err) {
//         console.log("error: ", err);
//         result(null, err);
//         return;
//       }

//       if (res.affectedRows == 0) {
//         result({ kind: "not_found" }, null);
//         return;
//       }

//       console.log("user updated: ", { id: id, ...user });
//       result(null, { id: id, ...user });
//     }
//   );
// };

// User.remove = (id, result) => {
//   conn.query("DELETE FROM user WHERE id_user = ?", id, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     if (res.affectedRows == 0) {
//       result({ kind: "not_found" }, null);
//       return;
//     }

//     console.log("Erased user with id: ", id);
//     result(null, res);
//   });
// };

// module.exports = User;
