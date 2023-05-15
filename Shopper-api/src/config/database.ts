import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const configDatabase = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

let connection: mysql.Connection;

async function connectToDatabase() {
  connection = await mysql.createConnection(configDatabase);
  console.log("Connected to database.");
}

export {connection, connectToDatabase}