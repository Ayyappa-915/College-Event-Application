const express = require("express");
const router = express.Router();

const {
  participateEvent,
  myParticipations,
  completedEvents,
  dashboardStats,
} = require("../controllers/studentController");

const authMiddleware = require("../middleware/authMiddleware");

/* Participate in event */
router.post("/participate", authMiddleware, participateEvent);

/* My participations */
router.get("/participations", authMiddleware, myParticipations);

/* Completed events */
router.get("/completed", authMiddleware, completedEvents);

/* Dashboard */
router.get("/dashboard", authMiddleware, dashboardStats);

module.exports = router;