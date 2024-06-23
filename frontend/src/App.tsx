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
    const [loading, setLoading] = useState(true);

    async function fetchData() {
        console.log("pixelData = " + pixels);
        const data = await fetchCanvas();
        setPixels(data);
        setLoading(false);
        console.log("data = ");
        console.log(data);
    }

    async function handleClick(pixelID:any) {//: number) {
        //console.log(pixels);
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

    const handleColorChange = (id: string, colour: any ) => {
        // set all things of value to this        

        console.log("buttom of id pressed " + id);

        var ele = document.querySelector(".colourOptionSelected");
        console.log(ele);
        if (ele) ele.className = "colourOption";

        ele = document.getElementById(id);
        if (ele) ele.className = "colourOptionSelected";

        setSelectedColour(colour);
    };

    const renderPixelCanvas = () => {

        if (loading) return <p>Loading...</p>

        return Array.from({ length: 10 }, (_, row) => (
            <div style={{display: "flex", flexWrap: "nowrap"}}>
                {pixels.slice(row * 10, row * 10 + 10).map((_, col) => (
                    <div
                        className="square"
                        style={{ backgroundColor: pixels[row * 10 + col].colour}}
                        onClick={() => handleClick(row * 10 + col + 1)}
                    />
                ))}
            </div>  
        ));
    }


    useEffect(() => {
        fetchData(); // Initial fetch

        //const intervalId = setInterval(fetchData, 1000);

        //return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        //console.log("pixels = ");
        //console.log(pixels);
    }, [pixels]);

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