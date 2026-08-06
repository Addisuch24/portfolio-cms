// Import the bcrypt library (currently not used for manual plain-text passwords)
const bcrypt = require("bcrypt");

// Import the jsonwebtoken library for generating JWT tokens
const jwt = require("jsonwebtoken");

// Import the authentication repository
const authRepository = require("../repositories/authRepository");

const ApiError = require("../utils/ApiError");

// Import application configuration
const config = require("../config/env");

// Authentication service class
class AuthService {

  // Login method
  async login(email, password) {

    // Find user by email
    const user = await authRepository.findUserByEmail(email);

    if (!user) {
      throw new ApiError(401, "Invalid email or password.");
    }

    let isMatch = false;

    if (typeof user.password === "string" && user.password.startsWith("$2")) {
      isMatch = await bcrypt.compare(password, user.password);
    } else {
      isMatch = password === user.password;

      if (isMatch) {
        const hashedPassword = await bcrypt.hash(password, 10);
        await authRepository.updatePassword(user.id, hashedPassword);
      }
    }

    if (!isMatch) {
      throw new ApiError(401, "Invalid email or password.");
    }

    if (!config.JWT_SECRET) {
      throw new Error("JWT_SECRET is not configured. Set JWT_SECRET in server/.env.");
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role
      },
      config.JWT_SECRET,
      {
        expiresIn: "30d"
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

  async changePassword(userId, currentPassword, newPassword) {
    const user = await authRepository.findUserById(userId);

    if (!user) {
      throw new ApiError(404, "User not found.");
    }

    if (user.password !== currentPassword) {
      throw new ApiError(400, "Current password is incorrect.");
    }

    if (!newPassword || newPassword.length < 6) {
      throw new ApiError(400, "New password must be at least 6 characters.");
    }

    await authRepository.updatePassword(userId, newPassword);

    return {
      message: "Password changed successfully."
    };
  }
}

// Export the service
module.exports = new AuthService();