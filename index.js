// server.js
import express, { json, urlencoded } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
// Routes
import authRoutes from './routes/auth.routes.js';
// import adminRoutes from './routes/admin.routes.js';
// import meetingRoutes from './routes/meeting.routes.js';
const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

// Database connection
import { sequelize } from './models/index.js';
sequelize.sync();


app.use('/api/auth', authRoutes);
// app.use('/api/admin', adminRoutes);
// app.use('/api/meetings', meetingRoutes);
// Add other routes

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});