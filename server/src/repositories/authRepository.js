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

  async findUserById(id) {
    const [rows] = await pool.execute(
      "SELECT * FROM users WHERE id = ? LIMIT 1",
      [id]
    );
    return rows[0];
  }

  async updatePassword(id, password) {
    const [result] = await pool.execute(
      "UPDATE users SET password = ? WHERE id = ?",
      [password, id]
    );
    return result;
  }
}
module.exports = new AuthRepository();