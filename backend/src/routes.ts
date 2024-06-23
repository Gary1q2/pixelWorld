import express from "express";
import { connectToDB } from "./db";
import { config } from "./config";
import { validatePixelData } from "./validation";

const pool = connectToDB();
const router = express.Router();

/**
 * GET API /pixels
 * Return array of pixel data
 */
router.get("/pixels", async (req, res) => {

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
router.post("/pixel", async (req, res) => {
    const pixelData = req.body;
    
    if (!validatePixelData(pixelData.id, pixelData.colour)) console.error("Failed to validate pixel POST request");

    try {
        const conn = await pool.getConnection();
        try {
            const query = "UPDATE pixels SET colour = ? WHERE id = ?";
            await conn.query(query, [pixelData.colour, pixelData.id]);
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

export default router;