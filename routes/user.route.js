module.exports = (app) => {
    const { VERSION, REST, API } = require("../constants");
    const user = require("../controllers/user.controller");
  
    var router = require("express").Router();

    router.post("/register", user.register);
    router.post("/login", user.login);
    router.get("/", user.findOne);
    router.put("/", user.update);
    router.delete("/", user.delete);
  
    app.use(`/${API}/${REST}/${VERSION}/user`, router);
  };
  