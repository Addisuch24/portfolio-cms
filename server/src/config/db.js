// import the mysql2/promise module and dotenv for environment variable management
const mysql = require("mysql2/promise");
// const mysql= re "mysql2/promise";
// import dotenv from "dotenv";
const dotenv = require("dotenv");
// const dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "portfolio_cms",
  port: Number(process.env.DB_PORT || 3306),
  connectTimeout: 5000,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;   