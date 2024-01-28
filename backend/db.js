require('dotenv').config();
const Pool = require("pg").Pool;

const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

// console.log(DB_USERNAME, DB_PASSWORD);

const pool = new Pool({
    user: DB_USERNAME,
    password: DB_PASSWORD,
    host: "localhost",
    port: 5432,
    database: "tododb"
});

module.exports = pool;