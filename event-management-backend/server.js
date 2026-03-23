require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const connectDB = require("./config/db");
const User = require("./models/User");

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const organizerRoutes = require("./routes/organizerRoutes");
const studentRoutes = require("./routes/studentRoutes");
const eventRoutes = require("./routes/eventRoutes");

const app = express();

/* Connect MongoDB */
connectDB();

/* CORS FIX */
app.use(cors({
  origin: "*",
  methods: ["GET","POST","PUT","DELETE"],
  allowedHeaders: ["Content-Type","Authorization"]
}));

/* Middleware */
app.use(express.json());

/* Handle Preflight Requests */
app.options("*", cors());

/* Middleware */
app.use(express.json());

/*
Create Default Admin
Runs when server starts
*/
const createDefaultAdmin = async () => {
  try {

    const adminExists = await User.findOne({ role: "admin" });

    if (!adminExists) {

      const hashedPassword = await bcrypt.hash("admin123", 10);

      const admin = new User({
        name: "Admin",
        rollNumber: "admin",
        email: "admin@college.com",
        department: "CSE",
        password: hashedPassword,
        role: "admin"
      });

      await admin.save();

      console.log("✅ Default Admin Created");
      console.log("Login with:");
      console.log("Roll Number: admin");
      console.log("Password: admin123");

    } else {
      console.log("ℹ️ Admin already exists");
    }

  } catch (error) {
    console.error("❌ Error creating admin:", error);
  }
};

/* Routes */
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/organizer", organizerRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/events", eventRoutes);

/* Default Route */
app.get("/", (req, res) => {
  res.send("College Event Management API Running 🚀");
});

/* Global Error Handler */
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    message: "Internal Server Error"
  });
});

/* Start Server */
const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {

  console.log(`🚀 Server running on port ${PORT}`);

  await createDefaultAdmin();

});

