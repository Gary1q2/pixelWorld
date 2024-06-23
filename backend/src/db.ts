import mysql from "mysql2/promise";
import { config } from "./config";

export function connectToDB() {

    try {
        const pool = mysql.createPool(config.mysql);
        console.log("MySQL connection pool created");
        return pool;

    } catch (err) {
        console.log("Error creating MySQL connection pool: ", err);
        process.exit(1);
    }
}