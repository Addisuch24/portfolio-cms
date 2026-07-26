const publicService =
require("../services/publicService");


const ApiResponse =
require("../utils/ApiResponse");


class PublicController {



async getProfile(req,res,next){

try{


const profile =
await publicService.getProfile();


res.status(200).json(

new ApiResponse(
200,
profile,
"Profile fetched successfully"
)

);


}catch(error){

next(error);

}

}





async getProjects(req,res,next){

try{


const projects =
await publicService.getProjects();


res.status(200).json(

new ApiResponse(
200,
projects,
"Projects fetched successfully"
)

);


}catch(error){

next(error);

}

}





async getSkills(req,res,next){

try{


const skills =
await publicService.getSkills();


res.status(200).json(

new ApiResponse(
200,
skills,
"Skills fetched successfully"
)

);


}catch(error){

next(error);

}

}





async getExperiences(req,res,next){

try{


const experiences =
await publicService.getExperiences();


res.status(200).json(

new ApiResponse(
200,
experiences,
"Experiences fetched successfully"
)

);


}catch(error){

next(error);

}

}





async getSocialLinks(req,res,next){

try{


const links =
await publicService.getSocialLinks();


res.status(200).json(

new ApiResponse(
200,
links,
"Social links fetched successfully"
)

);


}catch(error){

next(error);

}

}



}


module.exports =
new PublicController();