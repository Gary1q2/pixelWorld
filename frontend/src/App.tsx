import React, { useEffect, useState } from 'react';
import Counter from "./Counter";
import { fetchCanvas, setPixelColour } from "./apiService";
import logo from './logo.svg';
import './App.css';

interface Pixel {
    id: number;
    x: number;
    y: number;
    wtf: number;
    colour: string;
}

function App() {
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
        var pixelColour = pixels[pixelID-1].colour;
        var newColour:string;
        if (pixelColour == "#FFFFFF") {
            newColour = "#000000";
        } else {
            newColour = "#FFFFFF";
        }
        var res = await setPixelColour(pixelID, newColour);
        console.log(res);

        if (res.status == 200) {
            // set colour of pixel to that colour..

            const updatedPixels = pixels.map(pixel => {
                if (pixelID == pixel.id) {
                    return { ...pixel, colour: newColour };
                }
                return pixel;
            });

            setPixels(updatedPixels);
        }
    }

    useEffect(() => {
        fetchData();
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
            </header>
        </div>
    );
}

export default App;