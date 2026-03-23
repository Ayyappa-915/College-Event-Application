const express = require("express");
const router = express.Router();

const {
  createEventRequest,
  getApprovedEvents,
  getEventById,
  getAllEvents,
  deleteEvent,
  updateEvent,
} = require("../controllers/eventController");

const authMiddleware = require("../middleware/authMiddleware");


/*
Public / Students
View approved events
*/
router.get("/approved", getApprovedEvents);
router.get("/:id", getEventById);


/*
Organizer
Send event request
*/
router.post("/request", authMiddleware, createEventRequest);


/*
Admin
Manage events
*/
router.get("/", authMiddleware, getAllEvents);
router.delete("/:id", authMiddleware, deleteEvent);
router.put("/:id", authMiddleware, updateEvent);


module.exports = router;