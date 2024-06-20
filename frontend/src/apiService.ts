const API_URL = "http://localhost:6969";

// Fetch the current state of the canvas and display it
export async function fetchCanvas() {
    try {
        console.log("fetching");
        const response = await fetch(`${API_URL}/pixels`);
        return response.json();
    } catch (error) {
        console.error('Error fetching canvas:', error);
    }
}

// Set the color of a pixel
export async function setPixelColour(id: number, colour: string) {
    //const color = prompt('Enter a color (e.g., red, #00ff00, etc.):');
    console.log("id = " + id);
    console.log("colour = " + colour);

    const response = await fetch(`${API_URL}/pixel`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: id,
            colour: colour
        })
    });

    return response;
}