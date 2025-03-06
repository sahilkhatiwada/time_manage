// // meeting.routes.js
// import { verifyToken, isTeacher } from '../middleware/auth.middleware.js';
// import { createMeetingRequest, updateMeetingStatus } from '../controller/meeting.controller.js';

// export default app => {
//   app.post('/api/meetings', [verifyToken], createMeetingRequest);
//   app.put('/api/meetings/:id', [verifyToken, isTeacher], updateMeetingStatus);
// };