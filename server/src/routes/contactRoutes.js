const express = require("express");

const router = express.Router();

const contactController = require("../controllers/contactController");

const authenticate = require("../middlewares/authMiddleware");

// Public
router.post("/", contactController.create);

// Admin
router.get("/", authenticate, contactController.getAll);

router.patch(
    "/:id/read",
    authenticate,
    contactController.markAsRead
);

router.delete(
    "/:id",
    authenticate,
    contactController.delete
);

module.exports = router;