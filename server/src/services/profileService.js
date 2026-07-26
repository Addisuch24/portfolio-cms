const profileRepository =
require("../repositories/profileRepository");
// call the upload service to handle file uploads from the profile service
const uploadService =
require("./uploadService");

class ProfileService{

    async getProfile(){

        const profile =
        await profileRepository.getProfile();

        const socialLinks =
        await profileRepository.getSocialLinks();

        return{

            ...profile,

            socialLinks

        };

    }

    async updateProfile(data){

        return await profileRepository
        .updateProfile(data);

    }
    // upload profile image
async uploadProfileImage(id,file){


const profile =
await profileRepository.getProfile();


if(!profile){

throw new ApiError(
404,
"Profile not found"
);

}



if(profile.profile_image_public_id){

await uploadService.deleteFile(

profile.profile_image_public_id

);

}



const uploaded =
await uploadService.uploadFile(

file.path,

"portfolio/profile"

);



await profileRepository.updateProfileImage(

id,

uploaded.url,

uploaded.publicId

);


return uploaded;


}
}

module.exports =
new ProfileService();