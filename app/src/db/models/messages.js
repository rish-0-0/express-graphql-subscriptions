export default function (sequelize, Sequelize) {
  const messages = sequelize.define('messages', {
    text: {
      type: Sequelize.DataTypes.TEXT,
    },
    media: {
      type: Sequelize.DataTypes.STRING,
    },
  });

  return messages;
}