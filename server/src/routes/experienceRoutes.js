const express = require("express");

const router = express.Router();

const experienceController =
require("../controllers/experienceController");

const authenticate =
require("../middlewares/authMiddleware");

router.get(

    "/",

    experienceController.getAll

);

router.post(

    "/",

    authenticate,

    experienceController.create

);

router.put(

    "/:id",

    authenticate,

    experienceController.update

);

router.delete(

    "/:id",

    authenticate,

    experienceController.delete

);

module.exports = router;