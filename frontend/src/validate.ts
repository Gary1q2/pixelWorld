import { CONFIG } from "./config";

/**
 * Validates POST request pixel data
 * @param id 
 * @param colour 
 */
export function validatePixelData(id: number, colour: string) {
    
    if (!(typeof id === "number")) {
        console.error("Pixel ID is not a number: ", id);
        return false;
    }
    if (!(id >= 1 && id <= CONFIG.totalPixels)) {
        console.error(`Pixel ID is not a valid number between 1 and ${CONFIG.totalPixels}: `, id);
        return false;
    }

    if (!(typeof colour === "string")) {
        console.error(`Pixel colour is not a string: `, colour);
        return false;
    } 
    if (!isHexColour(colour)) {
        console.error(`Pixel colour is not a valid hex: `, colour);
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