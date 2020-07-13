export default function (sequelize, Sequelize) {
  const chats = sequelize.define('chats', {
    public: {
      type: Sequelize.DataTypes.BOOLEAN,
    },
    title: {
      type: Sequelize.DataTypes.STRING,
    }
  });
  return chats;
}