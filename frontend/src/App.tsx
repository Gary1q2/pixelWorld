import React, { useEffect, useState } from 'react';
import Counter from "./Counter";
import { fetchCanvas, setPixelColour } from "./apiService";
import logo from './logo.svg';
import './App.css';

interface Pixel {
    id: number;
    wtf: number;
    colour: string;
}

function App() {
    const [selectedColour, setSelectedColour] = useState('#000000'); // Default color
    const [pixels, setPixels] = useState<Pixel[]>([]);

    async function fetchData() {
        console.log("pixelData = " + pixels);
        const data = await fetchCanvas();
        setPixels(data);
        console.log("data = ");
        console.log(data);
    }

    async function handleClick(pixelID: number) {
        console.log("clicked on pixel " + pixelID);
        /*var pixelColour = pixels[pixelID-1].colour;
        var newColour:string;
        if (pixelColour == "#FFFFFF") {
            newColour = "#000000";
        } else {
            newColour = "#FFFFFF";
        }*/
        var res = await setPixelColour(pixelID, selectedColour);
        console.log(res);

        if (res.status == 200) {
            // set colour of pixel to that colour..

            const updatedPixels = pixels.map(pixel => {
                if (pixelID == pixel.id) {
                    return { ...pixel, colour: selectedColour };
                }
                return pixel;
            });

            setPixels(updatedPixels);
        }
    }

    const handleColorChange = (colour: string) => {
        setSelectedColour(colour);
    };


    useEffect(() => {
        fetchData(); // Initial fetch

        const intervalId = setInterval(fetchData, 1000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        console.log("pixels = ");
        console.log(pixels);
    }, [pixels]);

    return (
        <div className="App">
            <header className="App-header">
                <h1>Pixel Canvas</h1>


                <div>
                    {pixels.map(pixel => (
                        <div
                            key={pixel.id}
                            className="square"
                            style={{ backgroundColor: pixel.colour }}
                            onClick={() => handleClick(pixel.id)}
                        />
                    ))}
                </div>

                <div className="colour-panel">
                    <h2>Color Panel</h2>
                    <button className="colourSelection" onClick={() => handleColorChange('#000000')} style={{ backgroundColor: '#000000' }}></button>
                    <button className="colourSelection" onClick={() => handleColorChange('#FFFFFF')} style={{ backgroundColor: '#FFFFFF' }}></button>
                    <button className="colourSelection" onClick={() => handleColorChange('#FF0000')} style={{ backgroundColor: '#FF0000' }}></button>
                    <button className="colourSelection" onClick={() => handleColorChange('#00FF00')} style={{ backgroundColor: '#00FF00' }}></button>
                    <button className="colourSelection" onClick={() => handleColorChange('#0000FF')} style={{ backgroundColor: '#0000FF' }}></button>
                    {/* Add more color buttons as needed */}
                </div>
            </header>
        </div>
    );
}

export default App;