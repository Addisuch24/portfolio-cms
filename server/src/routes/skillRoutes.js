const express=require("express");

const router=express.Router();

const controller=require("../controllers/skillController");
const upload = require("../middlewares/upload");

const authenticate=require("../middlewares/authMiddleware");

router.get("/",controller.getAll);

router.get("/:id",controller.getById);

router.post("/",authenticate, upload.single('icon'), controller.create);

router.put("/:id",authenticate, upload.single('icon'), controller.update);

router.delete("/:id",authenticate,controller.delete);

module.exports=router;