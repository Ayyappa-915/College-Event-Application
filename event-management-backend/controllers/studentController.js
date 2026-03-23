const Participation = require("../models/Participation");
const Event = require("../models/Event");

/*
Student participates in an event
*/
exports.participateEvent = async (req, res) => {
  try {

    const student = req.user.id; // from JWT
    const { event } = req.body;

    if (!event) {
      return res.status(400).json({
        message: "Event ID is required",
      });
    }

    const existing = await Participation.findOne({
      student,
      event,
    });

    if (existing) {
      return res.status(400).json({
        message: "You already registered for this event",
      });
    }

    const participation = new Participation({
      student,
      event,
      status: "requested",
    });

    await participation.save();

    res.json({
      message: "Participation request sent",
      participation,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};


/*
Get all participations of logged-in student
*/
exports.myParticipations = async (req, res) => {
  try {

    const student = req.user.id;

    const data = await Participation.find({
      student,
    })
      .populate("event", "title date location")
      .populate("student", "name rollNumber");

    res.json(data);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};


/*
Completed events (approved participation)
*/
exports.completedEvents = async (req, res) => {
  try {

    const student = req.user.id;

    const participations = await Participation.find({
      student,
      status: "approved"
    }).populate("event");

    const completed = participations.filter(p => {

      if(!p.event || !p.event.date) return false;

      const eventDate = new Date(p.event.date);
      const today = new Date();

      return eventDate < today;

    });

    res.json(completed);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error",
    });

  }
};


exports.dashboardStats = async (req, res) => {
  try {

    const student = req.user.id;

    const participations = await Participation.find({
      student
    }).populate("event");

    const totalParticipations = participations.length;

    const today = new Date();

    const completed = participations.filter(p => {
      if (!p.event || p.status !== "approved") return false;
      return new Date(p.event.date) < today;
    });

    const approvedParticipations = completed.length;

    const totalEvents = await Event.countDocuments({
      status: "approved"
    });

    res.json({
      totalEvents,
      totalParticipations,
      approvedParticipations
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error"
    });

  }
};