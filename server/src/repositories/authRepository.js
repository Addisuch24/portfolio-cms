// write comments for line of code below in this file without changing the code
const pool = require("../config/db"); // Import the database connection pool from the db configuration file

class AuthRepository { // Define a class named AuthRepository to handle authentication-related database operations
  // Define an asynchronous method to find a user by their email address
  async findUserByEmail(email) { 
    const [rows] = await pool.execute(
      "SELECT * FROM users WHERE email = ? LIMIT 1",
      // Execute the SQL query with the provided email parameter
      [email]
    );
// wait for the database query to execute and destructure the result to get the rows returned from the query
    return rows[0];
  }
}
module.exports = new AuthRepository();