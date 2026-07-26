const cloudinary = require("../config/cloudinary");
const fs = require("fs/promises");

class ImageService {

    async uploadImage(filePath) {

        try {

            const result = await cloudinary.uploader.upload(filePath, {
                folder: "portfolio/projects"
            });

            await fs.unlink(filePath);

            return {
                imageUrl: result.secure_url,
                publicId: result.public_id
            };

        } catch (error) {

            try {
                await fs.unlink(filePath);
            } catch (_) {}

            throw error;
        }
    }

    async deleteImage(publicId) {

        if (!publicId) return;

        await cloudinary.uploader.destroy(publicId);

    }

}

module.exports = new ImageService();