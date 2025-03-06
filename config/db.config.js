import dotenv from 'dotenv';
dotenv.config();
// Database connection
const  connectDB = {
    HOST: process.env.DB_HOST || 'localhost',
    USER: process.env.DB_USER || 'root',
    PASSWORD: process.env.DB_PASSWORD || '',
    DB: process.env.DB_NAME || 'testDb',
    dialect: 'mysql',
  };
  
export const { DB, USER, PASSWORD, HOST, dialect } = connectDB;