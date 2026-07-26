const express=require("express");

const router=express.Router();


const controller =
require("../controllers/publicController");



router.get(
"/profile",
controller.getProfile
);


router.get(
"/projects",
controller.getProjects
);



router.get(
"/skills",
controller.getSkills
);



router.get(
"/experiences",
controller.getExperiences
);



router.get(
"/social-links",
controller.getSocialLinks
);



module.exports=router;