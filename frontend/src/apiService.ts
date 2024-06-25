import { CONFIG } from "./config";
import { validatePixelData } from "./validate";

/**
 * Call get API to fetch current state of canvas
 */
export async function fetchCanvas() {
    try {
        const response = await fetch(`${CONFIG.API_URL}/pixels`);
        return response.json();
    } catch (error) {
        console.error('Error fetching canvas:', error);
    }
}

/**
 * Call post API to set colour of pixel
 * @param id 
 * @param colour 
 */
export async function setPixelColour(id: number, colour: string, currColour: string) {

    if (!validatePixelData(id, colour, currColour)) return false;

    try {
        const res = await fetch(`${CONFIG.API_URL}/pixel`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
                colour: colour
            })
        });
        return res;

    } catch (error) {
        console.error("Error setting pixel on canvas:", error);
        return null;
    }
}