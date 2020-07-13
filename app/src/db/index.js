import Sequelize from "sequelize";
import config_file from "../../config/database.json";
import chats from "./models/chats";
import users from "./models/users";
import messages from "./models/users";

const config = config_file[process.env.NODE_ENV || "development"];

let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

const db = {};
db.users = users(sequelize, Sequelize);
db.chats = chats(sequelize, Sequelize);
db.messages = messages(sequelize, Sequelize);

// Adding constructors to the objects
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// User Associations
db.users_btm_chats = db.users.belongsToMany(db.chats, {
  through: "chats_users",
});
db.users_hm_messages = db.users.hasMany(db.messages, {
  foreignKey: { name: "user_id", allowNull: false },
  onDelete: "cascade",
  hooks: true,
});

// Chat Associations
db.chats_btm_users = db.chats.belongsToMany(db.users, {
  through: "chats_users",
});
db.chats_hm_messages = db.chats.hasMany(db.messages, {
  foreignKey: { name: "chat_id", allowNull: false },
  onDelete: "cascade",
  hooks: true,
});

// Message Associations
db.messages_bt_users = db.messages.belongsTo(db.users, {
  foreignKey: { name: "user_id", allowNull: false },
});
db.messages_bt_chats = db.messages.belongsTo(db.chats, {
  foreignKey: { name: "chat_id", allowNull: false },
});

export default db;
