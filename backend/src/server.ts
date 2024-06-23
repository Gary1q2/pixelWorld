import express, { json } from "express";
import path from "path";
import cors from "cors";
import routes from "./routes";
import { config } from "./config";

// Configuration
const PORT = process.env.PORT || config.port;

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.static(path.join(__dirname, ".."))); // Set the public folder
app.use("/", routes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});