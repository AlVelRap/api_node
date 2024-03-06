module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
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

  return User;
};
