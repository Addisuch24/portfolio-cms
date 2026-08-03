const cloudinary = require("../config/cloudinary");
const fs = require("fs/promises");
const path = require("path");


class UploadService {

    async uploadFile(filePath, folder) {

        const cloudinaryConfig = cloudinary.config();
        const isCloudinaryConfigured =
            cloudinaryConfig.api_key &&
            cloudinaryConfig.cloud_name &&
            cloudinaryConfig.api_secret;

        if (!isCloudinaryConfigured) {
            const serverUrl = process.env.SERVER_URL || "http://localhost:5000";
            return {
                url: `${serverUrl}/uploads/${path.basename(filePath)}`,
                publicId: null,
            };
        }

        let result;
        try {
            result = await cloudinary.uploader.upload(filePath, {
                folder,
            });
        } finally {
            try {
                await fs.unlink(filePath);
            } catch (unlinkError) {
                if (unlinkError.code !== "ENOENT") {
                    throw unlinkError;
                }
            }
        }

        return {
            url: result.secure_url,
            publicId: result.public_id,
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