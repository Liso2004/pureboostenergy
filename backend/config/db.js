// config/db.js
const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST,       // e.g., 'localhost'
  user: process.env.DB_USER,       // e.g., 'root'
  password: process.env.DB_PASS,   // your MySQL password
  database: process.env.DB_NAME,   // your database name
});

module.exports = db;
