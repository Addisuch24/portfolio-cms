const express = require("express");// Import the Express library to create a router for handling authentication routes
const authRoutes = require("./routes/authRoutes"); // Import the authentication routes defined in the authRoutes.js file
const app = express();
//  projectRoutes register
const projectRoutes = require("./routes/projectRoutes"); // Import the project routes defined in the projectRoutes.js file
app.use(express.json()); // Middleware to parse incoming JSON requests and make the data available in req.body
app.use("/api/auth", authRoutes);// Mount the authentication routes under the "/api/auth" path, so that requests to this path will be handled by the authRoutes router
app.use("/api/projects",projectRoutes); // Mount the project routes under the "/api/projects" path, so that requests to this path will be handled by the projectRoutes router
app.get("/", (req, res) => {
  res.send("Addidu's Portfolio CMS API is running...");
});
const errorHandler = require("./middlewares/errorHandler");
const dashboardRoutes =
require("./routes/dashboardRoutes");

app.use("/api/dashboard", dashboardRoutes);

// Routes
app.use("/api/auth", authRoutes);

// Error Handler (always last)
app.use(errorHandler);
 
module.exports =app;
 
 
 