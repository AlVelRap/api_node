module.exports = (sequelize, Sequelize) => {
  const Role = sequelize.define("role", {
    id_role: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING(64),
      allowNull: false,
    },
  });

  return Role;
};
