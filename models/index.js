import { DB, USER, PASSWORD, HOST, dialect } from '../config/db.config.js';
import Sequelize from 'sequelize';


const sequelize = new Sequelize(DB, USER, PASSWORD,
  
   {
  host: HOST,
  dialect: dialect,
pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
 });


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
import User from './user.model.js';

// Initialize models
db.User = User(sequelize, Sequelize);


export { db, sequelize };