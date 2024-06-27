import { useEffect, useState } from "react";
import { fetchCanvas, setPixelColour } from "./apiService";
import { CONFIG } from "./config";
import "./App.css";

interface Pixel {
    id: number;
    colour: string;
}

function App() {
    const [selectedColour, setSelectedColour] = useState("#000000");
    const [pixels, setPixels] = useState<Pixel[]>([]);
    const [loading, setLoading] = useState(true);

    const popSound = new Audio("pop.mp3");

    var coloursToUse:string[] = [
        "#FF0000", 
        "#FF8000",
        "#FFFF00",
        "#00FF00",
        "#00FFFF",
        "#0000FF",
        "#7F00FF",
        "#FF00FF",
        "#FF007F",
        "#808080",
        "#000000", 
        "#FFFFFF", 
    ];

    async function fetchData() {
        const data = await fetchCanvas();

        /*let data: any = [];
        for (var i = 0; i < CONFIG.totalPixels; i++) {
            data.push({
                id: i,
                colour: "#F045AB"
            });
        }*/


        console.log("Grabbed new data");
        setPixels(data);
        setLoading(false);
    }

    async function handleClick(pixelID:any) {
        const res = await setPixelColour(pixelID, selectedColour, pixels[pixelID].colour);
        if (res) {
            res.json().then(data => {
                popSound.play();
                const updatedPixels = pixels.map(pixel => {
                    if (pixelID == pixel.id) {
                        return { id: pixel.id, colour: selectedColour };
                    } else {
                        return pixel;
                    }
                });
                setPixels(updatedPixels);
            });
        }
    }

    const renderPixelCanvas = () => {
        if (loading) return <p>Loading...</p>
        
        let len = Math.sqrt(CONFIG.totalPixels);

        return Array.from({ length: len }, (_, row) => (
            <div className="pixelRow">
                {pixels.slice(row * len, row * len + len).map((_, col) => (
                    <div
                        className="square"
                        style={{ backgroundColor: pixels[row * len + col].colour}}
                        onClick={() => handleClick(row * len + col)}
                    />
                ))}
            </div>  
        ));
    }

    useEffect(() => {
        fetchData();

        const intervalId = setInterval(fetchData, 1000);

        return () => clearInterval(intervalId);
    }, []);


    return (
        <div className="App">
            <main id="mainContent">
                <h1>Online Pixel Canvas</h1>
                <h3>Select a colour and click on the pixels below to change their colour!</h3>
                {<div id="colourPanel">
                    {coloursToUse.map((item, index) => (
                        <button
                            className={`colourOption ${selectedColour === item ? "selected" : ""}`}
                            onClick={() => setSelectedColour(item)} 
                            style={{ backgroundColor: item }}>
                        </button>
                    ))}
                </div>}
                <div id="pixel-canvas">
                    {renderPixelCanvas()}
                </div>
            </main>
        </div>
    );
}

export default App;