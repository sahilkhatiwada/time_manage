// auth.routes.js
import { signup, signin } from '../controller/auth.controller.js';

export default app => {
  app.post('/api/auth/signup', signup);
  app.post('/api/auth/signin', signin);
};