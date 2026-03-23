const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/*
REGISTER (Student Registration)
*/
exports.register = async (req, res) => {
  try {
    const { name, rollNumber, email, department, password } = req.body;

    // Basic validation
    if (!name || !rollNumber || !email || !department || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Check existing user
    const existingUser = await User.findOne({ rollNumber });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with this roll number",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      rollNumber,
      email,
      department,
      password: hashedPassword,
      role: "student",
    });

    await user.save();

    // Remove password before sending response
    const userData = user.toObject();
    delete userData.password;

    res.json({
      message: "Registration successful",
      user: userData,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};


/*
LOGIN (Admin / Organizer / Student)
*/
exports.login = async (req, res) => {
  try {
    const { rollNumber, password } = req.body;

    if (!rollNumber || !password) {
      return res.status(400).json({
        message: "Roll number and password are required",
      });
    }

    const user = await User.findOne({ rollNumber });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Compare password
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Remove password
    const userData = user.toObject();
    delete userData.password;

    res.json({
      message: "Login successful",
      token,
      user: userData,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};


/*
GET USER PROFILE
*/
exports.getProfile = async (req, res) => {
  try {

    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json(user);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error"
    });

  }
};


/*
UPDATE USER PROFILE
*/
exports.updateProfile = async (req, res) => {
  try {

    const { name, email, department } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        name,
        email,
        department
      },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json({
      message: "Profile updated successfully",
      user
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error"
    });

  }
};