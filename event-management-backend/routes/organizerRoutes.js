const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  sendEventRequest,
  getMyEvents,
  getParticipationRequests,
  getParticipants,
  approveParticipant,
  rejectParticipant
} = require("../controllers/organizerController");

/* Send event request */
router.post(
  "/event-request",
  auth,
  roleMiddleware("organizer"),
  sendEventRequest
);

/* Organizer events */
router.get(
  "/my-events",
  auth,
  roleMiddleware("organizer"),
  getMyEvents
);

/* Participation requests */
router.get(
  "/participation-requests",
  auth,
  roleMiddleware("organizer"),
  getParticipationRequests
);

/* All participants */
router.get(
  "/participants",
  auth,
  roleMiddleware("organizer"),
  getParticipants
);

/* Approve student */
router.put(
  "/approve-participant/:id",
  auth,
  roleMiddleware("organizer"),
  approveParticipant
);

/* Reject student */
router.put(
  "/reject-participant/:id",
  auth,
  roleMiddleware("organizer"),
  rejectParticipant
);

module.exports = router;