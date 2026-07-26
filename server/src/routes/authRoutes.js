const express = require("express"); // Import the Express library to create a router for handling authentication routes

const router = express.Router();// Create a new router instance using Express to define authentication-related routes

const authController = require("../controllers/authController");

 const {
    loginValidation 
    // Import the loginValidation middleware from the authValidator.js file to validate the incoming request data for the login route
} = require("../validators/authValidator");

const validationMiddleware = require("../middlewares/validationMiddleware");

router.post(
    "/login",

    loginValidation, // Apply the loginValidation middleware to validate the incoming request data for the login route

    validationMiddleware, //!SECTION Apply the validationMiddleware to handle any validation errors that may occur during the login request

    authController. login // Call the login method from the authController to handle the login logic after successful validation
);

module.exports = router;