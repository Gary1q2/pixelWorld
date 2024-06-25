import express from "express";
import * as database from "./db";
import { validatePixelData } from "./validation";

const router = express.Router();

/**
 * GET API /pixels
 * Return array of pixel data
 */
router.get("/pixels", async (req, res) => {
    res.json(database.getCache());
});

/**
 * POST API /pixel
 * Sets the colour of an individual pixel
 */
router.post("/pixel", async (req, res) => {
    const pixelData = req.body;

    if (!validatePixelData(pixelData.id, pixelData.colour)) {
        res.json(false);
        return;
    }

    try {
        const conn = await database.pool.getConnection();
        try {
            const query = "UPDATE pixels SET colour = ? WHERE id = ?";
            await conn.query(query, [pixelData.colour, pixelData.id]);
            console.log(`Set pixel ${pixelData.id} to colour ${pixelData.colour}`)
            res.json(true);

            await database.grabPixelData();

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