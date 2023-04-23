'use strict';

const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.users = require("./users")(sequelize, DataTypes);
db.user_data = require("./user_data")(sequelize, DataTypes);
db.user_otps = require("./user_otps")(sequelize, DataTypes);
db.products = require("./products")(sequelize, DataTypes);
db.orders = require("./orders")(sequelize, DataTypes);
db.orderitems = require("./orderitems")(sequelize, DataTypes);
db.wishlists = require("./wishlist")(sequelize, DataTypes);
db.roles = require("./role")(sequelize, DataTypes);
db.user_roles = require("./user_role")(sequelize, DataTypes);
db.claims = require("./claims")(sequelize, DataTypes);
db.carts = require('./cart')(sequelize, DataTypes);
db.reviews = require('./reviews')(sequelize, DataTypes);
db.feedbacks = require('./feedbacks')(sequelize, DataTypes);
module.exports = db;
