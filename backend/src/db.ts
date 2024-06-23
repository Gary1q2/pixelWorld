import mysql from "mysql2/promise";

export function connectToDB() {

    try {
        const pool = mysql.createPool({
            host: "localhost",
            user: "root", 
            password: "",
            database: "pixel_world",
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });

        console.log("MySQL connection pool created");
        return pool;
    } catch (err) {
        console.log("Error creating MySQL connection pool: ", err);
        process.exit(1);
    }
}