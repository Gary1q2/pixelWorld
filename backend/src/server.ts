import express, { json } from "express";
import { connectToDB } from "./db";
import path from "path";
import cors from "cors";

// Configuration
const PORT = process.env.PORT || 6969;


const pool = connectToDB();
const app = express();

app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.static(path.join(__dirname, "..")));




app.get("/canvas", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "index.html"));
});

/**
 * GET API /pixels
 * Return array of pixel data
 */
app.get("/pixels", async (req, res) => {

    try {
        const conn = await pool.getConnection();
        try {
            const [value] = await conn.query("SELECT * FROM pixels");
            res.json(value);

        } catch (queryError) {
            console.log("Error querying database: ", queryError);
            res.status(500).json({ error: "Failed to grab pixel data" });

        } finally {
            conn.release();
        }

    } catch (connError) {
        console.log("Error connecting to database: ", connError);
        res.status(500).json({ error: "Failed to connect to database" });
    }
});

/**
 * POST API /pixel
 * Sets the colour of an individual pixel
 */
app.post("/pixel", async (req, res) => {
    const pixelData = req.body;
    console.log(pixelData);

    try {
        const conn = await pool.getConnection();
        try {
            await conn.query(`UPDATE pixels SET colour = "${pixelData.colour}" WHERE id = ${pixelData.id}`);
            console.log(`Set pixel ${pixelData.id} to colour ${pixelData.colour}`)
            res.json(true);

        } catch (queryError) {
            console.error("Error setting pixel in database: ", queryError);
            res.status(500).json({ error: "Failed to set pixel" });

        } finally {
            conn.release();
        }

    } catch (connError) {
        console.log("Error connecting to database: ", connError);
        res.status(500).json({ error: "Failed to connect to database" });
    }
});


// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
