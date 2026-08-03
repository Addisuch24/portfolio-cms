const multer = require("multer");
const path = require("path");
const fs = require("fs");

const baseUploadDirectory = path.join(__dirname, "..", "..", "uploads");
const imageUploadDirectory = path.join(baseUploadDirectory, "images");
const resumeUploadDirectory = path.join(baseUploadDirectory, "resumes");

for (const directory of [baseUploadDirectory, imageUploadDirectory, resumeUploadDirectory]) {
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
    }
}

const storage = multer.diskStorage({
    destination(req, file, cb) {
        const destinationDirectory =
            file.fieldname === "image" || file.fieldname === "icon"
                ? imageUploadDirectory
                : resumeUploadDirectory;

        cb(null, destinationDirectory);
    },

    filename(req, file, cb) {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    },
});

module.exports = multer({ storage });