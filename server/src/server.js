const app = require("./app");
// Import pool
const pool = require("./config/db");
//Import PORT from config/env.js.
const PORT = process.env.PORT || 5000;
// Create async function startServer().
async function startServer() {
  try {
    // Test the database connection
    const connection = await pool.getConnection;
    console.log("✅ Database connected successfully");
      //connection.release(); // Release the connection back to the pool
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1); // Exit the process with an error code
  }
}
// Call startServer()
startServer().then(() => {
  // Start the server after successful database connection
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });
})
