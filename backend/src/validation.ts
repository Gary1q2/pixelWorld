import { config } from "./config";
import { getCache } from "./db";

/**
 * Validates POST request pixel data
 * @param id 
 * @param colour 
 */
export function validatePixelData(id: number, colour: string) {
    
    // Make sure id is a valid number
    if (!(typeof id === "number")) {
        console.error("Pixel ID is not a number: ", id);
        return false;
    }
    if (!(id >= 0 && id <= config.totalPixels)) {
        console.error(`Pixel ID is not a valid number between 1 and ${config.totalPixels}: `, id);
        return false;
    }

    // Make sure colour is a valid number
    if (!(typeof colour === "string")) {
        console.error(`Pixel colour is not a string: `, colour);
        return false;
    } 
    if (!isHexColour(colour)) {
        console.error(`Pixel colour is not a valid hex: `, colour);
        return false;
    } 

    // Can't set a pixel to the same colour
    let cache = getCache();
    if (cache[id].colour == colour) {
        console.error(`Cannot set pixel ${id} to the same colour ${colour}`);
        return false;
    }

    return true;
}

/**
 * Checks if an input is of the hex form #FFFFFF
 * @param input 
 */
function isHexColour(input:string) {
    const hexRegex = /^#([0-9A-Fa-f]{6})$/;
    return hexRegex.test(input);
}