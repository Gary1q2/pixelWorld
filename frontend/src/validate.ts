import { CONFIG } from "./config";

/**
 * Validates POST request pixel data
 * @param id 
 * @param targetColour 
 */
export function validatePixelData(id: number, targetColour: string, currColour: string) {
    
    if (!(typeof id === "number")) {
        console.error("Pixel ID is not a number: ", id);
        return false;
    }
    if (!(id >= 0 && id <= CONFIG.totalPixels)) {
        console.error(`Pixel ID is not a valid number between 1 and ${CONFIG.totalPixels}: `, id);
        return false;
    }

    if (!(typeof targetColour === "string")) {
        console.error(`Pixel colour is not a string: `, targetColour);
        return false;
    } 
    if (!isHexColour(targetColour)) {
        console.error(`Pixel colour is not a valid hex: `, targetColour);
        return false;
    } 

    if (currColour == targetColour) {
        //console.error(`Cannot set pixel to the same colour: `, targetColour);
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