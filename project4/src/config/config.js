import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.DB_HOST,
  database: process.env.PG_DB,
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

export default pool;
