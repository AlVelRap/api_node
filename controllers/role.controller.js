const roleService = require("../services/role.service.js");

exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Tutorial
  const role = {
    name: req.body.name,
  };

  // Save Tutorial in the database
  roleService.create(role, (err, data) => {
    if (err) {
      res.status(500).send({
        message: "Some error occurred while creating the Role.",
      });
    } else {
      res.send(data);
    }
  });
};

exports.findOne = (req, res) => {
  roleService.findById(req.params.id_role, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Role with id ${req.id_role} not found.`,
        });
      } else {
        res.status(500).send({
          message: "Error when receiving the Role with id " + req.id_role,
        });
      }
    } else {
      res.send(data);
    }
  });
};

exports.findAll = (req, res) => {
  const name = req.query.name;

  roleService.findAll(name, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Roles not found.`,
        });
      } else {
        res.status(500).send({
          message: "Some error occurred while retrieving Roles",
        });
      }
    } else {
      res.send(data);
    }
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "The request cannot be empty!",
    });
  }

  req.body.id_role = req.params.id_role;

  roleService.updateById(req.params.id_role, req.body, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({
          message: `Role with id ${req.body.id_role} not found.`,
        });
      } else {
        return res.status(500).send({
          message: "Error when updating the Role with id " + req.body.id_role,
        });
      }
    } else {
      return res.send({
        id_role: data.id_role,
        name: data.name,
      });
    }
  });
};

exports.delete = (req, res) => {
  roleService.remove(req.params.id_role, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Role with id ${req.params.id_role} not found.`,
        });
      } else {
        res.status(500).send({
          message: `Cannot delete Role with id ${req.params.id_role}.`,
        });
      }
    } else res.send({ message: `Role deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  roleService.removeAll((err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Role with id ${req.params.id_role} not found.`,
        });
      } else {
        res.status(500).send({
          message: `Cannot delete Role with id ${req.params.id_role}.`,
        });
      }
    } else res.send({ message: `${data} Role deleted successfully!` });
  });
};

exports.addUser=(req, res)=>{
  
  roleId=req.body.id_role
  userId=req.body.id_user

  roleService.addUser(roleId,userId, (err,data)=>{
    if(err){
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Role/User not found.`,
        });
      } else {
        res.status(500).send({
          message: `Cannot add Role with id ${roleId} to User with id ${userId}.`,
        });
      }

    }else res.send({message: `added Role id='${roleId}' to User id='${data.id_user}'`})
  })
  
}
