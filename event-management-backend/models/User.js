const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
  name: {
    type: String,
    required: true,
    trim: true
  },

  rollNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email"]
  },

  department: {
    type: String,
    enum: ["CSE", "ECE", "EEE", "MECH", "CIVIL", "IT"],
    required: true
  },

  password: {
    type: String,
    required: true,
    minlength: 6
  },

  role: {
    type: String,
    enum: ["admin", "organizer", "student"],
    default: "student"
  }

},
{ timestamps: true }
);

module.exports = mongoose.model("User", userSchema);