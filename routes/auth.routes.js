// auth.routes.js
import { signup, signin } from '../controllers/auth.controller';

export default app => {
  app.post('/api/auth/signup', signup);
  app.post('/api/auth/signin', signin);
};