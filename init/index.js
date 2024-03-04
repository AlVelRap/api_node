const userService = require("../services/user.service");
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

  userService.register(user1, (err, data) => {});
  userService.register(user2, (err, data) => {});
  userService.register(user3, (err, data) => {});
  userService.register(user4, (err, data) => {});
};
