import mysql from "mysql2/promise";
import { config } from "./config";

export const pool: mysql.Pool = connectToDB();

var cache: any = null;
var isExpired: boolean = true;

// Grab pixel data on init
grabPixelData();

/**
 * Connect to database and create myqsl pool object
 */
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

/**
 * Fetches the pixel data from database and caches
 */
export async function grabPixelData() {
    try {
        const conn = await pool.getConnection();
        try {
            const [value] = await conn.query("SELECT * FROM pixels");
            console.log("Retrieved fresh database and added to cache");
            cache = value;

        } catch (queryError) {
            console.log("Error querying database: ", queryError);
            
        } finally {
            conn.release();
        }

    } catch (connError) {
        console.log("Error connecting to database: ", connError);
    }
}



export function setCache(data: any) {
    cache = data;
}

export function getCache() {
    return cache;
}

export function setIsExpiredState(status: boolean) {
    isExpired = status;
}

export function getIsExpiredState() {
    return isExpired;
}