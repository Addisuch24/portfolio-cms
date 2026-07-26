const authService = require("../services/authService");// Import the authService module to access authentication-related service operations

class AuthController {
  async login(req, res, next) { // Define an asynchronous method named login that handles the login request, response, and error handling
    try {
      const { email, password } = req.body; // Destructure the email and password from the request body

      const result = await authService.login(email, password); // Call the login method from the authService to authenticate the user and generate a JWT token
 // Log a message indicating that the login was successful
 const message = " 🙋🏽‍♂️Login successful 🙏🏽";
 res.status(200).json({ message, ...result }); // Send a successful response with status code 200 and the result containing the token and user information

    } catch (error) {
      next(error); // Pass any errors that occur during the login process to the next middleware for error handling
    }
  }
}

module.exports = new AuthController();
