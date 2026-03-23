const Event = require("../models/Event");
const Participation = require("../models/Participation");

/*
Create Event Request
Organizer sends event to admin
*/
exports.sendEventRequest = async (req, res) => {

  try {

    const { title, description, department, date, location } = req.body;

    const organizer = req.user.id;

    const event = new Event({
      title,
      description,
      department,
      date,
      location,
      organizer,
      status: "pending"
    });

    await event.save();

    res.json({
      message: "Event request sent to admin",
      event
    });

  } catch (error) {

    res.status(500).json(error);

  }

};


/*
Get Organizer Events
*/
exports.getMyEvents = async (req, res) => {

  try {

    const organizer = req.user.id;

    const events = await Event.find({ organizer });

    res.json(events);

  } catch (error) {

    res.status(500).json(error);

  }

};


/*
Get Participation Requests
Only pending requests for organizer events
*/
exports.getParticipationRequests = async (req, res) => {

  try {

    const organizer = req.user.id;

    // get organizer events
    const events = await Event.find({ organizer }).select("_id");

    const eventIds = events.map(e => e._id);

    // get only pending requests
    const requests = await Participation.find({
      event: { $in: eventIds },
      status: "requested"
    })
    .populate("student", "name rollNumber department")
    .populate("event", "title date");

    res.json(requests);

  } catch (error) {

    res.status(500).json(error);

  }

};

/*
Approve Student Participation
*/
exports.approveParticipant = async (req, res) => {

  try {

    const participation = await Participation.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );

    res.json(participation);

  } catch (error) {

    res.status(500).json(error);

  }

};


/*
Reject Student Participation
*/
exports.rejectParticipant = async (req, res) => {

  try {

    const participation = await Participation.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true }
    );

    res.json(participation);

  } catch (error) {

    res.status(500).json(error);

  }

};

/*
Get All Participants of Organizer Events
*/
exports.getParticipants = async (req, res) => {
  try {

    const organizer = req.user.id;

    const events = await Event.find({ organizer }).select("_id");

    const eventIds = events.map(e => e._id);

    const participants = await Participation.find({
      event: { $in: eventIds }
    })
      .populate("student", "name rollNumber department email")
      .populate("event", "title date location");

    res.json(participants);

  } catch (error) {
    res.status(500).json(error);
  }
};