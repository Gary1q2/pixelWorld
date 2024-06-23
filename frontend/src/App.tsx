import { useEffect, useState } from 'react';
import { fetchCanvas, setPixelColour } from "./apiService";
import './App.css';

interface Pixel {
    id: number;
    colour: string;
}

function App() {
    const [selectedColour, setSelectedColour] = useState('#000000'); // Default color
    const [pixels, setPixels] = useState<Pixel[]>([]);
    const [loading, setLoading] = useState(true);

    async function fetchData() {
        const data = await fetchCanvas();
        console.log("Pixel data: ");
        console.log(data);
        setPixels(data);
        setLoading(false);
    }

    async function handleClick(pixelID:any) {
        console.log("Click on pixel " + pixelID);

        var res = await setPixelColour(pixelID, selectedColour);
        if (res.status == 200) {

            const updatedPixels = pixels.map(pixel => {
                if (pixelID == pixel.id) {
                    return { ...pixel, colour: selectedColour };
                }
                return pixel;
            });

            setPixels(updatedPixels);
        }
    }

    const handleColorChange = (id: string, colour: any ) => {
        var ele = document.querySelector(".colourOptionSelected");
        console.log(ele);
        if (ele) ele.className = "colourOption";

        ele = document.getElementById(id);
        if (ele) ele.className = "colourOptionSelected";

        setSelectedColour(colour);
    };

    const renderPixelCanvas = () => {

        if (loading) return <p>Loading...</p>

        let totalPixels = 100;

        return Array.from({ length: totalPixels }, (_, row) => (
            <div style={{display: "flex", flexWrap: "nowrap"}}>
                {pixels.slice(row * totalPixels, row * totalPixels + totalPixels).map((_, col) => (
                    <div
                        className="square"
                        style={{ backgroundColor: pixels[row * totalPixels + col].colour}}
                        onClick={() => handleClick(row * totalPixels + col + 1)}
                    />
                ))}
            </div>  
        ));
    }


    useEffect(() => {
        fetchData(); // Initial fetch
        const intervalId = setInterval(fetchData, 5000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <div className="colour-panel">
                    <h2>Color Panel</h2>
                    <button id="colourOption1" className="colourOption" onClick={() => handleColorChange("colourOption1", "#000000")} style={{ backgroundColor: '#000000' }}></button>
                    <button id="colourOption2" className="colourOption" onClick={() => handleColorChange("colourOption2", '#FFFFFF')} style={{ backgroundColor: '#FFFFFF' }}></button>
                    <button id="colourOption3" className="colourOption" onClick={() => handleColorChange("colourOption3", '#FF0000')} style={{ backgroundColor: '#FF0000' }}></button>
                    <button id="colourOption4" className="colourOption" onClick={() => handleColorChange("colourOption4", '#00FF00')} style={{ backgroundColor: '#00FF00' }}></button>
                    <button id="colourOption5" className="colourOption" onClick={() => handleColorChange("colourOption5", '#0000FF')} style={{ backgroundColor: '#0000FF' }}></button>
                    {/* Add more color buttons as needed */}
                </div>

                <h3>Select a colour above and select pixels below to change the colour!</h3>
                <h3>Online pixel board</h3>
                <div id="pixel-canvas">{renderPixelCanvas()}</div>
            </header>
        </div>
    );
}

export default App;