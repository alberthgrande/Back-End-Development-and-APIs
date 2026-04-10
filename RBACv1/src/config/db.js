import dotenv from "dotenv";
dotenv.config();

import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function testConnection() {
  try {
    const res = await pool.query("SELECT 1");
    console.log("Connected successfully:", res.rows);
  } catch (err) {
    console.error("Connection error:", err);
  } finally {
    await pool.end();
  }
}

testConnection();
