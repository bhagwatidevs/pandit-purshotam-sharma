
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = Number(process.env.PORT || 5000);
const isDevelopment = process.env.NODE_ENV !== "production";

/* =====================================
   CORS CONFIGURATION
===================================== */

const allowedOrigins = (
  process.env.FRONTEND_ORIGIN ||
  "http://localhost:5173,http://127.0.0.1:5173"
)
  .split(",")
  .map((origin) => origin.trim().replace(/\/$/, ""))
  .filter(Boolean);

const isLocalDevelopmentOrigin = (origin) =>
  /^https?:\/\/(localhost|127\.0\.0\.1|\[::1\])(?::\d+)?$/i.test(origin);

const corsOptions = {
  origin(origin, callback) {
    // Requests without Origin header are allowed.
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // Allow localhost ports during development.
    if (isDevelopment && isLocalDevelopmentOrigin(origin)) {
      return callback(null, true);
    }

    return callback(
      new Error(`Origin is not allowed by CORS: ${origin}`)
    );
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));

/* =====================================
   BODY PARSER
===================================== */

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

/* =====================================
   BASIC ROUTES
===================================== */

app.get("/", (_req, res) => {
  res.send("Astrology backend is running.");
});

app.get("/api/health", (_req, res) => {
  const databaseState = mongoose.connection.readyState;

  res.status(200).json({
    status: "OK",
    message: "Backend is running",
    timestamp: new Date().toISOString(),
    database: databaseState === 1 ? "Connected" : "Disconnected",
  });
});

/* =====================================
   API ROUTES INVENTORY
===================================== */

app.get("/api/routes", (_req, res) => {
  res.json({
    status: "OK",
    apiBase: "/api",
    routes: [
      { path: "/api/health", methods: ["GET"] },
      { path: "/api/routes", methods: ["GET"] },

      { path: "/api/auth/register", methods: ["POST"] },
      { path: "/api/auth/login", methods: ["POST"] },

      { path: "/api/blog", methods: ["GET", "POST"] },
      { path: "/api/blog/:id", methods: ["PUT", "DELETE"] },

      { path: "/api/press-release", methods: ["GET", "POST"] },
      { path: "/api/press-release/:id", methods: ["PUT", "DELETE"] },

      { path: "/api/press-releases", methods: ["GET", "POST"] },
      { path: "/api/news", methods: ["GET", "POST"] },

      { path: "/api/news-slides", methods: ["GET"] },
      { path: "/api/news-slides/admin", methods: ["GET", "POST"] },
      { path: "/api/news-slides/admin/:id", methods: ["PUT", "DELETE"] },

      { path: "/api/product", methods: ["GET", "POST"] },
      { path: "/api/product/:id", methods: ["PUT", "DELETE"] },

      { path: "/api/products", methods: ["GET", "POST"] },

      { path: "/api/photo", methods: ["GET", "POST"] },
      { path: "/api/photo/:id", methods: ["PUT", "DELETE"] },

      { path: "/api/photos", methods: ["GET", "POST"] },

      { path: "/api/contact", methods: ["POST", "GET"] },

      { path: "/api/subscribers", methods: ["POST", "GET"] },

      // Testimonials Reviews API
      { path: "/api/reviews", methods: ["GET", "POST"] },

      { path: "/api/cart", methods: ["GET", "DELETE"] },
      { path: "/api/cart/add", methods: ["POST"] },
      { path: "/api/cart/remove/:productId", methods: ["DELETE"] },

      { path: "/api/orders", methods: ["GET"] },

      { path: "/api/payment/create-order", methods: ["POST"] },

      { path: "/api/kundli/generate", methods: ["POST"] },

      { path: "/api/admin/stats", methods: ["GET"] },
    ],
  });
});

/* =====================================
   DATABASE CONNECTION CHECK
===================================== */

app.use("/api", (req, res, next) => {
  if (req.path === "/health" || req.path === "/routes") {
    return next();
  }

  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      message:
        "MongoDB is not connected. Check backend/.env and the MONGO_URI setting, then restart the backend.",
    });
  }

  return next();
});

/* =====================================
   ROUTE IMPORTS
===================================== */

app.use("/api/auth", require("./routes/authRoutes"));

const blogRouter = require("./routes/blogRoutes");
const pressReleaseRouter = require("./routes/pressReleaseRoutes");
const productRouter = require("./routes/productRoutes");
const photoRouter = require("./routes/photoRoutes");

// News Slider
const { protect, allowRoles } = require("./middleware/authMiddleware");

// Testimonials Reviews
const reviewRouter = require("./routes/reviewRoutes");

/* =====================================
   NEWS SLIDER ADMIN AUTHENTICATION
===================================== */

const requireAdmin = (req, res, next) =>
  protect(req, res, (err) => {
    if (err) return next(err);

    return allowRoles("admin")(req, res, next);
  });

const newsSlideRouter = require("./routes/newsSlideRoutes")({
  requireAdmin,
});

/* =====================================
   API ROUTE REGISTRATION
===================================== */

app.use("/api/blog", blogRouter);
app.use("/api/blogs", blogRouter);

app.use("/api/press-release", pressReleaseRouter);
app.use("/api/press-releases", pressReleaseRouter);
app.use("/api/news", pressReleaseRouter);

app.use("/api/news-slides", newsSlideRouter);

app.use("/api/product", productRouter);
app.use("/api/products", productRouter);

app.use("/api/photo", photoRouter);
app.use("/api/photos", photoRouter);

app.use("/api/contact", require("./routes/contactRoutes"));

app.use("/api/payment", require("./routes/paymentRoutes"));

app.use("/api/cart", require("./routes/cartRoutes"));

app.use("/api/orders", require("./routes/orderRoutes"));

app.use("/api/kundli", require("./routes/kundliRoutes"));

app.use("/api/admin", require("./routes/adminRoutes"));

app.use("/api/subscribers", require("./routes/subscriberRoutes"));

// =====================================
// TESTIMONIALS REVIEWS API
// =====================================

app.use("/api/reviews", reviewRouter);

/* =====================================
   GLOBAL ERROR HANDLER
===================================== */

app.use((err, _req, res, _next) => {
  console.error("Request error:", err.message || err);

  if (res.headersSent) return;

  const status =
    err.status ||
    err.statusCode ||
    (String(err.message).startsWith(
      "Origin is not allowed by CORS"
    )
      ? 403
      : 500);

  res.status(status).json({
    message: status === 500 ? "Server error" : err.message,

    ...(process.env.NODE_ENV === "development"
      ? { details: err.message }
      : {}),
  });
});

/* =====================================
   404 HANDLER
===================================== */

app.use((req, res) => {
  if (req.path.startsWith("/api/")) {
    return res.status(404).json({
      message: "API route not found",
      method: req.method,
      path: req.originalUrl,
      hint:
        "Check GET /api/routes to see registered API routes. Restart the backend after changing route files.",
    });
  }

  return res.status(404).json({
    message: "Route not found",
    path: req.originalUrl,
  });
});

/* =====================================
   START SERVER & CONNECT DATABASE
===================================== */

app.listen(PORT, () => {
  console.log(
    `Astrology backend running at http://localhost:${PORT}`
  );

  console.log(
    `Allowed frontend origins: ${allowedOrigins.join(", ")}`
  );

  if (isDevelopment) {
    console.log(
      "Development CORS also allows localhost/127.0.0.1 on any port."
    );
  }

  if (!process.env.MONGO_URI) {
    console.error(
      "Missing MONGO_URI. Set it in backend/.env"
    );
    return;
  }

  mongoose
    .connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 8000,
    })
    .then(() => {
      const databaseName = mongoose.connection.db?.databaseName;

      console.log(
        `MongoDB connected${databaseName ? ` (${databaseName})` : ""}.`
      );
    })
    .catch((error) => {
      console.error(
        "MongoDB connection failed:",
        error.message
      );

      console.error(
        "Check MONGO_URI and MongoDB Atlas network access."
      );
    });
});
