const express = require("express"); // Import the Express library to create a router for handling authentication routes

const router = express.Router();// Create a new router instance using Express to define authentication-related routes

const authController = require("../controllers/authController");

const {
    loginValidation,
    changePasswordValidation
} = require("../validators/authValidator");

const validationMiddleware = require("../middlewares/validationMiddleware");
const authenticate = require("../middlewares/authMiddleware");

router.post(
    "/login",

    loginValidation, // Apply the loginValidation middleware to validate the incoming request data for the login route

    validationMiddleware, //!SECTION Apply the validationMiddleware to handle any validation errors that may occur during the login request

    authController.login // Call the login method from the authController to handle the login logic after successful validation
);

router.put(
    "/change-password",

    authenticate,

    changePasswordValidation,

    validationMiddleware,

    authController.changePassword
);

module.exports = router;