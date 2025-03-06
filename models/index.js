import { DB, USER, PASSWORD, HOST, dialect as _dialect, pool as _pool } from '../config/db.config';
import Sequelize from 'sequelize';

const sequelize = new Sequelize(DB, USER, PASSWORD, {
  host: HOST,
  dialect: _dialect,
  operatorsAliases: 0,
  pool: {
    max: _pool.max,
    min: _pool.min,
    acquire: _pool.acquire,
    idle: _pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.User = require('./user.model')(sequelize, Sequelize);
db.TeacherAvailability = require('./availability.model')(sequelize, Sequelize);
db.MeetingRequest = require('./meeting.model')(sequelize, Sequelize);
db.Post = require('./post.model')(sequelize, Sequelize);
db.Comment = require('./comment.model')(sequelize, Sequelize);

// Define associations
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

export default db;