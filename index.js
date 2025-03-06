// server.js
import express, { json, urlencoded } from 'express';
import cors from 'cors';
const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

// Database connection
import { sequelize } from './models';
sequelize.sync();

// Routes
require('./routes/auth.routes')(app);
require('./routes/meeting.routes')(app);
// Add other routes

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});