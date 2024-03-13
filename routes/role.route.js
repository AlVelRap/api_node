module.exports = (app) => {
  const { isAuthenticated } = require("../auth");
  const { VERSION, REST, API } = require("../constants");
  const role = require("../controllers/role.controller");
  var router = require("express").Router();

  // DONT FORGET TO UNCOMMENT isAuthenticated AGAIN!!!!!

  router.post("/",/*isAuthenticated,*/ role.create);
  router.get("/", /*isAuthenticated,*/ role.findAll);
  router.get("/:id_role", /*isAuthenticated,*/ role.findOne);
  router.put("/:id_role",/*isAuthenticated,*/ role.update);
  router.delete("/:id_role",/*isAuthenticated,*/ role.delete);
  router.delete("/",/*isAuthenticated,*/ role.deleteAll);

  app.use(`/${API}/${REST}/${VERSION}/role`, router);
};
