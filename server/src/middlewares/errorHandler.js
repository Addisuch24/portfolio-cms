const errorHandler = (err, req, res, next) => {

    // Log the error for debugging
    console.error('Error occurred:', err);
    console.error('Stack trace:', err.stack);

    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({

        success: false,

        message: err.message || "Internal Server Error",
        
        // Include stack trace in development
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })

    });

};

module.exports = errorHandler;