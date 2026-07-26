 const { body } = require("express-validator");

const createProjectValidation = [

    body("title")
        .trim()
        .notEmpty()
        .withMessage("Title is required.")
        .isLength({ max: 150 })
        .withMessage("Title cannot exceed 150 characters."),

    body("description")
        .trim()
        .notEmpty()
        .withMessage("Description is required."),

    body("github_url")
        .optional()
        .isURL()
        .withMessage("Invalid GitHub URL."),

    body("live_url")
        .optional()
        .isURL()
        .withMessage("Invalid Live Demo URL.")
];

module.exports = {
    createProjectValidation
};
//////////////////////

module.exports = {
    createProjectValidation
};