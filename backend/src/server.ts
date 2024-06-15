import express from "express";
import mysql from "mysql2/promise";
import path from 'path';

// Configuration
const PORT = process.env.PORT || 3000;
const DB_CONFIG = {
    host: "localhost",
    user: "root", 
    password: "pokerisfun12",
    database: "pixel_world"
};


const app = express();

console.log("dirname = " + __dirname);
app.use(express.static(path.join(__dirname, "..")));

app.get("/canvas", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "index.html"));
});

app.get("/pixels", async (req, res) => {
    const db = await mysql.createConnection(DB_CONFIG);
    const [value] = await db.query("SELECT * FROM pixels");
    res.json(value);
});

app.post("/pixel", async (req, res) => {
    const pixelData = req.body;
    const db = await mysql.createConnection(DB_CONFIG);
    const lol = await db.query(`UPDATE pixels SET colour = ${pixelData.colour} WHERE x = ${pixelData.x} AND y = ${pixelData.colour}`);

    const [result] = await db.query("SELECT * FROM pixels"); 
    res.json(result);
});


// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
