// // routes/admin.routes.js
// import { verifyToken, isAdmin } from '../middleware/auth.middleware.js';
// import { createAdmin } from '../controller/auth.controller.js';

// export default app => {
//   // Create admin (only accessible by existing admins)
//   app.post('/api/admin/create', [verifyToken, isAdmin], createAdmin);
  
//   // Admin-specific routes can be added here
// };