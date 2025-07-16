import pkg from "pg";
import dotenv from 'dotenv';

dotenv.config();
const { Pool } = pkg;

const pool = new Pool({
  host: 'db.egcbirmaycyqorbyzlau.supabase.co',
  port: 5432,
  user: 'postgres',
  password: 'Dawit@#2005',
  database: 'postgres',
  ssl: {
    rejectUnauthorized: false
  }
});

export default pool;
