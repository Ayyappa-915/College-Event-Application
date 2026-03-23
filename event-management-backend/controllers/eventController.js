const Event = require("../models/Event");

/*
Organizer sends event request to admin
Status = pending
*/
exports.createEventRequest = async (req, res) => {
  try {
    const { title, description, department, date, location } = req.body;

    // Validation
    if (!title || !description || !department || !date || !location) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const event = new Event({
      title,
      description,
      department,
      date,
      location,
      organizer: req.user.id, // taken from JWT
      status: "pending",
    });

    await event.save();

    res.json({
      message: "Event request submitted",
      event,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};


/*
Public / Student
Get approved events
*/
exports.getApprovedEvents = async (req, res) => {
  try {

    const events = await Event.find({ status: "approved" })
      .populate("organizer", "name department")
      .sort({ date: 1 });

    res.json(events);

  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};


/*
Get single event details
Used in EventDetails page
*/
exports.getEventById = async (req, res) => {
  try {

    const event = await Event.findById(req.params.id)
      .populate("organizer", "name department");

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    res.json(event);

  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};


/*
Admin: get all events
Used in ManageEvents page
*/
exports.getAllEvents = async (req, res) => {
  try {

    const events = await Event.find()
      .populate("organizer", "name department")
      .sort({ createdAt: -1 });

    res.json(events);

  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};


/*
Admin delete event
*/
exports.deleteEvent = async (req, res) => {
  try {

    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    res.json({
      message: "Event deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};


/*
Update event
*/
exports.updateEvent = async (req, res) => {
  try {

    const event = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    res.json({
      message: "Event updated successfully",
      event,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};