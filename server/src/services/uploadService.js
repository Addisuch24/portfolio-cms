const cloudinary = require("../config/cloudinary");
const fs = require("fs/promises");


class UploadService {


    async uploadFile(filePath,folder){


        const result =
        await cloudinary.uploader.upload(

            filePath,

            {
                folder
            }

        );


        await fs.unlink(filePath);


        return {

            url:result.secure_url,

            publicId:result.public_id

        };


    }



    async deleteFile(publicId){


        if(!publicId){

            return;

        }


        await cloudinary.uploader.destroy(
            publicId
        );


    }

}


module.exports=
new UploadService();