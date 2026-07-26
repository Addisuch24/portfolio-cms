// import the mysql2/promise module and dotenv for environment variable management
const mysql = require("mysql2/promise");
// const mysql= re "mysql2/promise";
// import dotenv from "dotenv";
const dotenv = require("dotenv");
// const dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});
console.log(process.env.DB_USER);
console.log(process.env.DB_PASSWORD);
console.log(process.env.DB_NAME);
console.log(process.env.DB_PORT);
// export the pool object to be used in other parts of the application
module.exports = pool;   