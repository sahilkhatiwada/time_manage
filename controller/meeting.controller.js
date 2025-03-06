// meeting.controller.js
export async function createMeetingRequest(req, res) {
    try {
      const meeting = await db.MeetingRequest.create({
        studentId: req.userId,
        teacherId: req.body.teacherId,
        type: req.body.type,
        requestedTime: req.body.requestedTime,
        status: 'pending'
      });
      res.status(201).send(meeting);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  }
  
/**
 * Update the status of a meeting request.
 * 
 * This function retrieves a meeting request by its primary key and updates its status
 * based on the request body. If the meeting request is not found, a 404 status is sent.
 * If the status update is successful, the updated meeting is returned in the response.
 *
 * @param {Request} req - The Express request object containing the meeting ID in params 
 *                        and the new status in the body.
 * @param {Response} res - The Express response object used to send back the updated meeting 
 *                         or an error message.
 * @returns {Promise<void>}
 */

  export async function   updateMeetingStatus(req, res) {
    try {
      const meeting = await db.MeetingRequest.findByPk(req.params.id);
      if (!meeting) return res.status(404).send({ message: "Meeting not found" });
      
      meeting.status = req.body.status;
      await meeting.save();
      
      res.send(meeting);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  }