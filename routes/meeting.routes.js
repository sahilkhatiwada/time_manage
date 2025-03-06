// meeting.routes.js
import { verifyToken } from '../middleware/authJwt';
import { isTeacher } from '../middleware/verifyRole';
import { createMeetingRequest, updateMeetingStatus } from '../controllers/meeting.controller';

export default app => {
  app.post('/api/meetings', [verifyToken], createMeetingRequest);
  app.put('/api/meetings/:id', [verifyToken, isTeacher], updateMeetingStatus);
};