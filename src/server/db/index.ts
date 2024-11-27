import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config({
  path: ".env.local",
});

const poolConnection = mysql.createPool({
  host: process.env.ENV === "prod" ? undefined : process.env.DB_HOST,
  socketPath:
    process.env.ENV === "prod" ? process.env.DB_SOCKET_PATH : undefined,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
const db = drizzle({ client: poolConnection });

export default db;
