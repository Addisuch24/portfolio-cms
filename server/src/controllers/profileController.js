const profileService =
require("../services/profileService");

const ApiResponse =
require("../utils/ApiResponse");

class ProfileController{

async getProfile(req,res,next){

try{

const profile =
await profileService.getProfile();

return res.status(200).json(

new ApiResponse(

200,

profile,

"Profile fetched successfully."

)

);

}

catch(error){

next(error);

}

}

async updateProfile(req,res,next){

try{

await profileService.updateProfile(req.body);

return res.status(200).json(

new ApiResponse(

200,

null,

"Profile updated successfully."

)

);

}

catch(error){

next(error);

}

}
//!SECTION
async uploadImage(req,res,next){


try{


const result =
await profileService.uploadProfileImage(

1,

req.file

);



res.status(200).json(

new ApiResponse(

200,

result,

"Profile image uploaded successfully"

)

);



}catch(error){

next(error);

}


}
}

module.exports =
new ProfileController();