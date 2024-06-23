import mysql from "mysql2/promise";
import { config } from "./config";

export async function runScript() {

    const conn = await mysql.createConnection(config.mysql);
    try {
        conn.connect();
        
        await conn.beginTransaction();

        const sql = 'INSERT INTO pixels (colour) VALUES ?';
        let values = [];
        
        // 100 x 100
        for (let y = 1; y <= 100; y++) {
            for (let x = 1; x <= 100; x++) {
                values.push(["#FFFFFF"]);
            }
        }
        console.log(values);
        await conn.query(sql, [values]);
        await conn.commit();

    } catch (error) {
        if (conn) await conn.rollback();
        console.error("Error connecting to database: " + conError);

    } finally {
        if (conn) await conn.end();
    }
}

runScript();