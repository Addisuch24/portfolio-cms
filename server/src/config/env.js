const dotenv = require("dotenv");
const config = require("./env");

dotenv.config();

const requiredEnv = [
  "DB_HOST",
  "DB_PORT",
  "DB_USER",
  "DB_NAME",
  "JWT_SECRET"
];

requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing environment variable: ${key}`);
  }
});

module.exports = {
  PORT: process.env.PORT || 5000,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USER: process.env.DB_USER,
  //DB_PASSWORD: process.env."",
  DB_NAME: process.env.DB_NAME,
  JWT_SECRET: process.env.JWT_SECRET
};
console.log({
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME
}); 

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