const userService = require("../services/user.service");
const roleService = require("../services/role.service");
exports.runs = async () => {
  const user1 = {
    name: "Alberto",
    lastname: "Velázquez Rapado",
    email: "alberto@dominio.com",
    password: "prueba",
  };
  const user2 = {
    name: "Paco",
    lastname: "Fernández Carrión",
    email: "paco@dominio.com",
    password: "paco",
  };
  const user3 = {
    name: "Antonio",
    lastname: "Gómez García",
    email: "antonio@dominio.com",
    password: "antonio",
  };
  const user4 = {
    name: "Juan",
    lastname: "Hernandez Salamanqués",
    email: "juan@dominio.com",
    password: "juan",
  };

  await userService.register(user1, (err, data) => {});
  await userService.register(user2, (err, data) => {});
  await userService.register(user3, (err, data) => {});
  await userService.register(user4, (err, data) => {});

  const role1 = { id_role: "test-admin", name: "admin" };
  const role2 = { id_role: "test-user", name: "user" };
  const role3 = { id_role: "test-delete", name: "delete" };
  const role4 = { id_role: "test-update", name: "update" };

  await roleService.create(role1, (err, data) => {});
  await roleService.create(role2, (err, data) => {});
  await roleService.create(role3, (err, data) => {});
  await roleService.create(role4, (err, data) => {});
};
