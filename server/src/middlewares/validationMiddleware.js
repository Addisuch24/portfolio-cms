const { validationResult } = require("express-validator"); // Import the validationResult function from the express-validator library to handle validation results

const validationMiddleware = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        return res.status(400).json({

            success: false,

            errors: errors.array()
        });
    }

    next();
};

module.exports = validationMiddleware;