const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

pool
  .connect()
  .then((client) => {
    console.log("✅ PostgreSQL connected");
    client.release();
  })
  .catch((err) => console.error("❌ PostgreSQL connection error", err));

module.exports = pool;
