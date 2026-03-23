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

/* =========================
CONNECT DATABASE
========================= */
connectDB();

/* =========================
CORS CONFIG (FIXED)
========================= */
app.use(cors({
origin: "https://college-event-application-313p.vercel.app",
methods: ["GET", "POST", "PUT", "DELETE"],
credentials: true
}));

app.options("*", cors());

/* =========================
MIDDLEWARE
========================= */
app.use(express.json());

/* =========================
CREATE DEFAULT ADMIN
========================= */
const createDefaultAdmin = async () => {
try {
const adminExists = await User.findOne({ role: "admin" });

```
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
```

} catch (error) {
console.error("❌ Error creating admin:", error);
}
};

/* =========================
ROUTES
========================= */
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/organizer", organizerRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/events", eventRoutes);

/* =========================
ROOT ROUTE
========================= */
app.get("/", (req, res) => {
res.send("College Event Management API Running 🚀");
});

/* =========================
GLOBAL ERROR HANDLER
========================= */
app.use((err, req, res, next) => {
console.error("🔥 Server Error:", err);

res.status(500).json({
message: "Internal Server Error"
});
});

/* =========================
START SERVER
========================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
console.log(`🚀 Server running on port ${PORT}`);
await createDefaultAdmin();
});
