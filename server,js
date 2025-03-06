// server.js
import dotenv from 'dotenv';
import { sequelize } from './models';
dotenv.config();

// Test database connection
sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));

// Sync database (use { force: true } for development to drop tables)
sequelize.sync()
  .then(() => console.log('Database synced'))
  .catch(err => console.log('Sync error: ' + err));