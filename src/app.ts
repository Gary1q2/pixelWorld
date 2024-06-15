const API_BASE_URL = "http://localhost:3000"; // Replace with your backend's base URL
//const canvas = document.getElementById('canvas') as HTMLDivElement;

// Fetch the current state of the canvas and display it
async function fetchCanvas(): Promise<void> {
    try {
        console.log("fetching");
        const response = await fetch(`${API_BASE_URL}/pixels`);
        const pixels = await response.json();
        renderCanvas(pixels);
    } catch (error) {
        console.error('Error fetching canvas:', error);
    }
}

// Render the canvas based on the fetched pixel data
function renderCanvas(pixels: { id: number; color: string; }[]): void {

    console.log(pixels);
    /*canvas.innerHTML = ''; // Clear the canvas
    pixels.forEach(pixel => {
        const pixelElement = document.createElement('div');
        pixelElement.classList.add('pixel');
        pixelElement.style.backgroundColor = pixel.color;
        pixelElement.dataset.id = pixel.id.toString();
        pixelElement.addEventListener('click', () => setPixelColor(pixel.id));
        canvas.appendChild(pixelElement);
    });*/
}

// Set the color of a pixel
/*async function setPixelColor(id: number): Promise<void> {
    const color = prompt('Enter a color (e.g., red, #00ff00, etc.):');
    if (color) {
        try {
            const response = await fetch(`${API_BASE_URL}/pixels/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ color }),
            });
            if (response.ok) {
                fetchCanvas(); // Refresh the canvas after setting the color
            } else {
                console.error('Error setting pixel color:', response.statusText);
            }
        } catch (error) {
            console.error('Error setting pixel color:', error);
        }
    }
}*/

// Initial fetch to display the canvas
fetchCanvas();

console.log("im gayyyyy");