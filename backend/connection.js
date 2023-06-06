import mysql from "mysql2";
import { createPool } from "mysql2";

// Create the connection pool.
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "todolist_mysql",
});

export default pool.promise();
