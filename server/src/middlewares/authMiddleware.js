const jwt = require("jsonwebtoken");
const config = require("../config/env");

const authMiddleware = (req, res, next) => {// Middleware function to authenticate requests using JWT (JSON Web Token)
  // Read Authorization header
  const authHeader = req.headers.authorization;// Extract the Authorization header from the incoming request, which should contain the JWT token in the format "Bearer <token>"

  // Check if header exists
  if (!authHeader) {
    return res.status(401).json({// If the Authorization header is missing, respond with a 401 Unauthorized status and a JSON message indicating that access is denied due to the absence of a token
      success: false,
      message: "Access denied. No token provided."
    });
  }

  // Header format: Bearer <token>
  const token = authHeader.split(" ")[1];

  try {
    // Verify the token
    const decoded = jwt.verify(token, config.JWT_SECRET);//!SECTION Verify the extracted token using the secret key defined in the configuration. If the token is valid, it will decode the payload and return it.

    // Attach decoded user information to the request
    req.user = decoded;

    // Continue to the next middleware/controller
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token."
    });
  }
};

module.exports = authMiddleware;