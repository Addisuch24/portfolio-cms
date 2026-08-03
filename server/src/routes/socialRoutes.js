const express = require("express");
const router = express.Router();

const socialController = require("../controllers/socialController");
const authenticate = require("../middlewares/authMiddleware");

router.get("/", authenticate, socialController.getAll);
router.post("/", authenticate, socialController.create);
router.get("/:id", authenticate, socialController.getById);
router.put("/:id", authenticate, socialController.update);
router.delete("/:id", authenticate, socialController.delete);

module.exports = router;
