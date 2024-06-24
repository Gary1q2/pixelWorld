import mysql from "mysql2/promise";

export async function runScript() {

    const conn = await mysql.createConnection({
        host: "localhost",
        user: "root", 
        password: "pokerisfun12",
        database: "pixel_world",
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });
    try {
        conn.connect();
        
        await conn.beginTransaction();

        await conn.query(`
            CREATE TABLE IF NOT EXISTS pixels (
                id INT PRIMARY KEY,
                colour VARCHAR(7) NOT NULL
            )
        `);

        const sql = 'INSERT INTO pixels (id, colour) VALUES ?';
        let values = [];
        
        // 100 x 100
        var id = 0;
        for (let y = 1; y <= 100; y++) {
            for (let x = 1; x <= 100; x++) {
                values.push([id++, "#FFFFFF"]);
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