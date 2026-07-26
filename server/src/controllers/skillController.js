const service=require("../services/skillService");
const ApiResponse=require("../utils/ApiResponse");

class SkillController{

async getAll(req,res,next){

try{

const skills=await service.getAll();

return res.status(200).json(

new ApiResponse(

200,

skills,

"Skills fetched successfully."

)

);

}catch(error){

next(error);

}

}

async create(req,res,next){

try{

const id=await service.create(req.body);

return res.status(201).json(

new ApiResponse(

201,

{id},

"Skill created successfully."

)

);

}catch(error){

next(error);

}

}

async update(req,res,next){

try{

await service.update(req.params.id,req.body);

return res.status(200).json(

new ApiResponse(

200,

null,

"Skill updated successfully."

)

);

}catch(error){

next(error);

}

}

async delete(req,res,next){

try{

await service.delete(req.params.id);

return res.status(200).json(

new ApiResponse(

200,

null,

"Skill deleted successfully."

)

);

}catch(error){

next(error);

}

}

}

module.exports=new SkillController();