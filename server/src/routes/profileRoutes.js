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


router.patch(

"/image",

authenticate,

upload.single("image"),

profileController.uploadImage

);

module.exports=router;