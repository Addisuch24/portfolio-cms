const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");
const path = require("path");

const app = express();

// ==========================
// Global Middleware
// ==========================
app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: "cross-origin",
    },
  })
);
app.use(cors());
app.use(compression());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// ==========================
// Route Imports
// ==========================
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const profileRoutes = require("./routes/profileRoutes");
const projectRoutes = require("./routes/projectRoutes");
const skillRoutes = require("./routes/skillRoutes");
const experienceRoutes = require("./routes/experienceRoutes");
const contactRoutes = require("./routes/contactRoutes");
const socialRoutes = require("./routes/socialRoutes");
const publicRoutes = require("./routes/publicRoutes");

// ==========================
// API Routes
// ==========================
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/experiences", experienceRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/social-links", socialRoutes);
app.use("/api/public", publicRoutes);

// ==========================
// Home Route
// ==========================
app.get("/", (req, res) => {
    res.send("Addisu's Portfolio CMS API is running...");
});

// ==========================
// Global Error Handler
// ==========================
const errorHandler = require("./middlewares/errorHandler");
app.use(errorHandler);

module.exports = app;