const express=require("express");

const router=express.Router();

const authenticate=
require("../middlewares/authMiddleware");
// profile controller
const profileController=
require("../controllers/profileController");

router.get(

"/",

profileController.getProfile

);

router.put(

"/",

authenticate,

profileController.updateProfile

);
// upload profile image
const upload =
require("../middlewares/uploadMiddleware");


router.post(

"/image",

authenticate,

upload.single("image"),

profileController.uploadImage

);

router.post(

"/resume",

authenticate,

upload.single("resume"),

profileController.uploadResume

);

module.exports=router;