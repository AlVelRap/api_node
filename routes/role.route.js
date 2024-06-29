module.exports = (app) => {
  const { isAuthenticated, hasRoles } = require("../auth");
  const { VERSION, REST, API } = require("../constants");
  const role = require("../controllers/role.controller");
  var router = require("express").Router();

  router.post("/", isAuthenticated, hasRoles(["admin"]), role.create);
  router.post("/user", isAuthenticated, hasRoles(["admin"]), role.addUser);
  router.get("/", isAuthenticated, hasRoles(["admin"]), role.findAll);
  router.get("/:id_role", isAuthenticated, hasRoles(["admin"]), role.findOne);
  router.put("/:id_role", isAuthenticated, hasRoles(["admin"]), role.update);
  router.delete("/:id_role", isAuthenticated, hasRoles(["admin"]), role.delete);
  router.delete("/", isAuthenticated, hasRoles(["admin"]), role.deleteAll);

  app.use(`/${API}/${REST}/${VERSION}/role`, router);
};
