import mysql from "mysql2/promise";

export async function runScript() {

    const conn = await mysql.createConnection({
        host: "localhost",
        user: "root", 
        password: "pokerisfun12",
        database: "pixel_world",
    });

    try {
        conn.connect();
        
        await conn.beginTransaction();

        const sql = 'INSERT INTO pixels (x, y, colour) VALUES ?';
        let values = [];
        
        // 100 x 100
        for (let y = 1; y <= 10; y++) {
            for (let x = 1; x <= 10; x++) {
                values.push([x, y, "#FFFFFF"]);
            }
        }
        console.log(values);
        await conn.query(sql, [values]);
        await conn.commit();

    } catch (error) {
        if (conn) await conn.rollback();
        console.error("Error connecting to database: " + conError);

    } finally {
        //if (conn) await conn.end();
    }
}

runScript();