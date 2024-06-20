import express, { json } from "express";
import mysql from "mysql2/promise";
import path from "path";
import cors from "cors";

// Configuration
const PORT = process.env.PORT || 6969;
const DB_CONFIG = {
    host: "localhost",
    user: "root", 
    password: "pokerisfun12",
    database: "pixel_world"
};


const app = express();

app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

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
    console.log(pixelData);

    try {
        const query = await db.query(`UPDATE pixels SET colour = "${pixelData.colour}" WHERE id = ${pixelData.id}`);
        console.log(`set pixel ${pixelData.id} to colour ${pixelData.colour}`)
        res.json(true);
    } catch  (error) {
        console.error("Error setting pixel in database", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
