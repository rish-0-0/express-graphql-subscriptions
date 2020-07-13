export default function (sequelize, Sequelize) {
  const users = sequelize.define('users', {
    phoneNumber: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: Sequelize.DataTypes.STRING,
    },
    online: {
      type: Sequelize.DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
  return users;
}