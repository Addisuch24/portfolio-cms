  
require("dotenv").config();

const config = {
  PORT: process.env.PORT || 5000,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  JWT_SECRET: process.env.JWT_SECRET,
};

module.exports = config;
///////////////////////////////////////////!SECTION
const CLOUDINARY_CLOUD_NAME =
    process.env.CLOUDINARY_CLOUD_NAME;

const CLOUDINARY_API_KEY =
    process.env.CLOUDINARY_API_KEY;

const CLOUDINARY_API_SECRET =
    process.env.CLOUDINARY_API_SECRET;

config.CLOUDINARY_CLOUD_NAME =
    CLOUDINARY_CLOUD_NAME;

config.CLOUDINARY_API_KEY =
    CLOUDINARY_API_KEY;

config.CLOUDINARY_API_SECRET =
    CLOUDINARY_API_SECRET;
    module.exports = {
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET
};
//!SECTION
const EMAIL_HOST=process.env.EMAIL_HOST;
const EMAIL_PORT=process.env.EMAIL_PORT;
const EMAIL_USER=process.env.EMAIL_USER;
const EMAIL_PASSWORD=process.env.EMAIL_PASSWORD;
const EMAIL_FROM=process.env.EMAIL_FROM;

config : {

EMAIL_HOST,

EMAIL_PORT,

EMAIL_USER,

EMAIL_PASSWORD,

EMAIL_FROM

};

module.exports=config;