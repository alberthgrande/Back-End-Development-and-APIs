const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  USER: process.env.PG_USER,
  PASSWORD: process.env.PG_PASSWORD,
  DATABASE: process.env.PG_DATABASE,
  PORT: process.env.PORT,
});

module.exports = pool;
