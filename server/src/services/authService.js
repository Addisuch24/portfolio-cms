// Import the bcrypt library (currently not used for manual plain-text passwords)
const bcrypt = require("bcrypt");

// Import the jsonwebtoken library for generating JWT tokens
const jwt = require("jsonwebtoken");

// Import the authentication repository
const authRepository = require("../repositories/authRepository");

// Import application configuration
const config = require("../config/env");

// Authentication service class
class AuthService {

  // Login method
  async login(email, password) {

    // Find user by email
    const user = await authRepository.findUserByEmail(email);

    // If the user does not exist
    if (!user) {
      throw new Error("Invalid email or password.");
    }

    // Compare plain-text passwords (FOR TESTING ONLY)
    const isMatch = password === user.password;

    // If passwords do not match
    if (!isMatch) {
      throw new Error("Invalid email or password.");
    }else {
      // disply login success message
      console.log("Login successful");
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role
      },
      config.JWT_SECRET,
      {
        expiresIn: "1d"
      }
    );

    // Return token and user information
    return {
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    };
  }
}

// Export the service
module.exports = new AuthService();