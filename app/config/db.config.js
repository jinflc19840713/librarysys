const env = require('./env.js');
 
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,
  logging: false,
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('../model/user.model.js')(sequelize, Sequelize);
db.authorities = require('../model/authorities.model.js')(sequelize, Sequelize);
db.store = require('../model/store.model.js')(sequelize, Sequelize);
db.paytype = require('../model/paytype.model.js')(sequelize, Sequelize);
db.merchandise = require('../model/merchandise.model.js')(sequelize, Sequelize);
db.categories = require('../model/categories.model.js')(sequelize, Sequelize);
db.relay = require('../model/message.model.js')(sequelize, Sequelize);
db.patchpanel = require('../model/patchpanel.model.js')(sequelize, Sequelize);
db.order = require('../model/order.model.js')(sequelize, Sequelize);
db.message = require('../model/message.model.js')(sequelize, Sequelize);
module.exports = db;
 