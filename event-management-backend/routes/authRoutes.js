const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getProfile,
  updateProfile
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

/* AUTH */
router.post("/register", register);
router.post("/login", login);

/* PROFILE */
router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);

module.exports = router;