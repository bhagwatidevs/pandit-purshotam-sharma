const Subscriber = require("../models/Subscriber");

const isValidEmail = (email) =>
  typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

exports.subscribe = async (req, res) => {
  try {
    const email = String(req.body?.email || "").trim().toLowerCase();

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Please provide a valid email address." });
    }

    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "This email is already subscribed." });
    }

    const subscriber = await Subscriber.create({ email });
    return res.status(201).json({
      success: true,
      message: "Subscription saved successfully.",
      subscriber: { id: subscriber._id, email: subscriber.email },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "This email is already subscribed." });
    }
    console.error("Subscribe error:", error);
    return res.status(500).json({ message: "Unable to save subscription." });
  }
};

exports.getSubscribers = async (_req, res) => {
  try {
    const subscribers = await Subscriber.find().select("email createdAt").sort({ createdAt: -1 });
    return res.json({ subscribers });
  } catch (error) {
    console.error("Get subscribers error:", error);
    return res.status(500).json({ message: "Unable to load subscribers." });
  }
};


exports.updateSubscriber = async (req, res) => {
  try {
    const mongoose = require("mongoose");
    const Subscriber = require("../models/Subscriber");
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid subscriber ID." });

    const email = String(req.body?.email || "").trim().toLowerCase();
    if (!isValidEmail(email)) return res.status(400).json({ message: "Please provide a valid email address." });

    const existing = await Subscriber.findOne({ email, _id: { $ne: id } });
    if (existing) return res.status(409).json({ message: "This email is already subscribed." });

    const subscriber = await Subscriber.findByIdAndUpdate(id, { email }, { new: true, runValidators: true }).select("email createdAt");
    if (!subscriber) return res.status(404).json({ message: "Subscriber not found." });
    return res.json({ success: true, subscriber, message: "Subscriber updated successfully." });
  } catch (error) {
    console.error("Update subscriber error:", error);
    return res.status(500).json({ message: "Unable to update subscriber." });
  }
};

exports.deleteSubscriber = async (req, res) => {
  try {
    const mongoose = require("mongoose");
    const Subscriber = require("../models/Subscriber");
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ message: "Invalid subscriber ID." });
    const subscriber = await Subscriber.findByIdAndDelete(req.params.id);
    if (!subscriber) return res.status(404).json({ message: "Subscriber not found." });
    return res.json({ success: true, message: "Subscriber deleted successfully." });
  } catch (error) {
    console.error("Delete subscriber error:", error);
    return res.status(500).json({ message: "Unable to delete subscriber." });
  }
};
