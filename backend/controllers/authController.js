const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const validEmail = (email) =>
  typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

exports.register = async (req, res) => {
  const name = String(req.body?.name || "").trim();
  const email = String(req.body?.email || "").trim().toLowerCase();
  const password = String(req.body?.password || "");
  const mobile = String(req.body?.mobile || "").trim();

  if (!name || name.length < 2) {
    return res.status(400).json({ msg: "Please provide a valid name." });
  }
  if (!validEmail(email)) {
    return res.status(400).json({ msg: "Please provide a valid email address." });
  }
  if (password.length < 8) {
    return res.status(400).json({ msg: "Password must be at least 8 characters long." });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ msg: "Email already exists." });
    }

    const hashedPass = await bcrypt.hash(password, 12);
    const newUser = new User({
      name,
      email,
      password: hashedPass,
      mobile,
      role: "user",
    });
    await newUser.save();

    return res.status(201).json({ success: true, msg: "User registered successfully." });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ msg: "Email already exists." });
    }
    console.error("Registration error:", err);
    return res.status(500).json({ msg: "Unable to register user." });
  }
};

exports.login = async (req, res) => {
  const email = String(req.body?.email || "").trim().toLowerCase();
  const password = String(req.body?.password || "");

  if (!validEmail(email) || !password) {
    return res.status(400).json({ msg: "Please provide email and password." });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ msg: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid email or password." });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is missing.");
      return res.status(500).json({ msg: "Authentication is not configured on the server." });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ msg: "Unable to sign in." });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found." });
    return res.status(200).json({ user });
  } catch (err) {
    console.error("Profile error:", err);
    return res.status(500).json({ msg: "Unable to load profile." });
  }
};

exports.getAllUsers = async (_req, res) => {
  try {
    const users = await User.find({ role: { $ne: "admin" } })
      .select("-password")
      .sort({ createdAt: -1 });
    return res.status(200).json({ users });
  } catch (err) {
    console.error("Get users error:", err);
    return res.status(500).json({ msg: "Unable to load users." });
  }
};
