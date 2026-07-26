const express = require("express");
const router = express.Router();

const controller = require("../controllers/projectController");

const authMiddleware = require("../middlewares/authMiddleware");
const validationMiddleware = require("../middlewares/validationMiddleware");
const upload = require("../middlewares/uploadMiddleware");

const { createProjectValidation } = require("../validators/projectValidator");

// Public routes
router.get("/", controller.getProjects);
router.get("/:id", controller.getProject);

// Protected routes
router.post(
    "/",
    authMiddleware,
    createProjectValidation,
    validationMiddleware,
    controller.createProject
);

router.put(
    "/:id",
    authMiddleware,
    createProjectValidation,
    validationMiddleware,
    controller.updateProject
);

router.patch(
    "/:id/image",
    authMiddleware,
    upload.single("image"),
    controller.uploadProjectImage
);

router.delete(
    "/:id",
    authMiddleware,
    controller.deleteProject
);

module.exports = router;