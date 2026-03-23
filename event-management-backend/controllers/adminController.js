const User = require("../models/User");
const Event = require("../models/Event");
const Participation = require("../models/Participation");
const bcrypt = require("bcryptjs");

/*
CREATE ORGANIZER
*/
exports.createOrganizer = async (req, res) => {

  try {

    const { name, rollNumber, email, department, password } = req.body;

    if (!name || !rollNumber || !email || !department || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const existingUser = await User.findOne({
      $or: [{ rollNumber }, { email }]
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Organizer already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const organizer = new User({
      name,
      rollNumber,
      email,
      department,
      password: hashedPassword,
      role: "organizer"
    });

    await organizer.save();

    const organizerData = organizer.toObject();
    delete organizerData.password;

    res.status(201).json({
      message: "Organizer created successfully",
      organizer: organizerData
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error"
    });

  }

};


/*
GET ALL ORGANIZERS
*/
exports.getOrganizers = async (req, res) => {

  try {

    const organizers = await User.find({ role: "organizer" })
      .select("-password")
      .sort({ createdAt: -1 });

    res.json(organizers);

  } catch (error) {

    res.status(500).json({
      message: "Error fetching organizers"
    });

  }

};


/*
DELETE ORGANIZER
*/
exports.deleteOrganizer = async (req, res) => {

  try {

    const organizer = await User.findOne({
      _id: req.params.id,
      role: "organizer"
    });

    if (!organizer) {
      return res.status(404).json({
        message: "Organizer not found"
      });
    }

    await organizer.deleteOne();

    res.json({
      message: "Organizer deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: "Error deleting organizer"
    });

  }

};


/*
GET EVENT REQUESTS
*/
exports.getEventRequests = async (req, res) => {

  try {

    const events = await Event.find({ status: "pending" })
      .populate("organizer", "name department")
      .sort({ createdAt: -1 });

    res.json(events);

  } catch (error) {

    res.status(500).json({
      message: "Error fetching event requests"
    });

  }

};


/*
APPROVE EVENT
*/
exports.approveEvent = async (req, res) => {

  try {

    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    if (event.status === "approved") {
      return res.status(400).json({
        message: "Event already approved"
      });
    }

    event.status = "approved";

    await event.save();

    res.json({
      message: "Event approved successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: "Error approving event"
    });

  }

};


/*
REJECT EVENT
*/
exports.rejectEvent = async (req, res) => {

  try {

    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    event.status = "rejected";

    await event.save();

    res.json({
      message: "Event rejected"
    });

  } catch (error) {

    res.status(500).json({
      message: "Error rejecting event"
    });

  }

};


/*
GET ALL EVENTS
*/
exports.getAllEvents = async (req, res) => {

  try {

    const events = await Event.find()
      .populate("organizer", "name department")
      .sort({ createdAt: -1 });

    res.json(events);

  } catch (error) {

    res.status(500).json({
      message: "Error fetching events"
    });

  }

};


/*
GET PARTICIPANTS
*/
exports.getParticipants = async (req, res) => {

  try {

    const participants = await Participation.find()
      .populate("student", "name rollNumber department")
      .populate("event", "title date")
      .sort({ createdAt: -1 });

    res.json(participants);

  } catch (error) {

    res.status(500).json({
      message: "Error fetching participants"
    });

  }

};


/*
ADMIN DASHBOARD STATS
*/
exports.dashboardStats = async (req, res) => {

  try {

    const totalEvents = await Event.countDocuments();

    const pendingEvents = await Event.countDocuments({
      status: "pending"
    });

    const totalStudents = await User.countDocuments({
      role: "student"
    });

    const totalOrganizers = await User.countDocuments({
      role: "organizer"
    });

    const totalParticipants = await Participation.countDocuments();

    res.json({
      totalEvents,
      pendingEvents,
      totalStudents,
      totalOrganizers,
      totalParticipants
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Error loading dashboard stats"
    });

  }

};

/*
Delete Participant
*/
exports.deleteParticipant = async (req,res)=>{

try{

await Participation.findByIdAndDelete(req.params.id);

res.json({
message:"Participant deleted successfully"
});

}catch(error){
res.status(500).json(error);
}

};