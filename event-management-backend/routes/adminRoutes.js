const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
  createOrganizer,
  getOrganizers,
  deleteOrganizer,
  getEventRequests,
  approveEvent,
  rejectEvent,
  getAllEvents,
  getParticipants,
  deleteParticipant,
  dashboardStats,
} = require("../controllers/adminController");

/* Organizer Management */
router.post("/create-organizer", authMiddleware, adminOnly, createOrganizer);
router.get("/organizers", authMiddleware, adminOnly, getOrganizers);
router.delete("/organizer/:id", authMiddleware, adminOnly, deleteOrganizer);

/* Event Requests */
router.get("/event-requests", authMiddleware, adminOnly, getEventRequests);
router.put("/approve-event/:id", authMiddleware, adminOnly, approveEvent);
router.put("/reject-event/:id", authMiddleware, adminOnly, rejectEvent);

/* Manage Events */
router.get("/events", authMiddleware, adminOnly, getAllEvents);

/* Participants */
router.get("/participants", authMiddleware, adminOnly, getParticipants);

/* ⭐ Delete participant */
router.delete("/participant/:id", authMiddleware, adminOnly, deleteParticipant);

/* Dashboard */
router.get("/dashboard", authMiddleware, adminOnly, dashboardStats);

module.exports = router;