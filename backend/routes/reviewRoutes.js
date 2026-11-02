const express = require("express");
const router = express.Router();

const Review = require("../models/Review");
const { protect, allowRoles } = require("../middleware/authMiddleware");

// GET ALL REVIEWS
// Homepage and admin panel
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find()
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    console.error("Fetch reviews error:", error);
    res.status(500).json({
      success: false,
      message: "Unable to fetch reviews",
    });
  }
});

// ADD NEW REVIEW
router.post("/", async (req, res) => {
  try {
    const { name, rating, text } = req.body;

    if (!name?.trim() || !text?.trim()) {
      return res.status(400).json({
        message: "Name and review are required",
      });
    }

    if (!Number.isInteger(Number(rating)) || Number(rating) < 1 || Number(rating) > 5) {
      return res.status(400).json({
        message: "Rating must be between 1 and 5",
      });
    }

    if (text.trim().length < 10 || text.trim().length > 1000) {
      return res.status(400).json({
        message: "Review must contain 10 to 1000 characters",
      });
    }

    const review = await Review.create({
      name: name.trim(),
      rating: Number(rating),
      text: text.trim(),
    });

    res.status(201).json({
      success: true,
      message: "Review submitted successfully",
      review,
    });
  } catch (error) {
    console.error("Add review error:", error);
    res.status(500).json({
      message: "Unable to submit review",
    });
  }
});

// DELETE REVIEW - ADMIN ONLY
router.delete("/:id", protect, allowRoles("admin"), async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);

    if (!review) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    console.error("Delete review error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid review ID",
      });
    }

    res.status(500).json({
      message: "Unable to delete review",
    });
  }
});

module.exports = router;