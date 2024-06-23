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

    const handleColorChange = (colour: string) => {
        setSelectedColour(colour);
    };

    const renderPixelCanvas = () => {

        if (loading) return <p>Loading...</p>

        let pixelGrid = [];

        var index = 0;

        //console.log(pixels);



        for (let row = 0; row < 10; row++) {
            let pixelRow = [];
            for (let col = 0; col < 10; col++) {
                const handleClickWithId = (id: number) => {
                    handleClick(id);
                }

                pixelRow.push(
                    <div
                        className="square"
                        style={{ backgroundColor: pixels[index].colour }}
                        onClick={() => handleClickWithId(index)}
                    />
                );
                //console.log("pixelId = " + pixels[index].id);
                if (index <= 98) index++;
            }

            pixelGrid.push(
                <div className="pixelRow">
                    { pixelRow }
                </div>
            );
        }
        return pixelGrid;
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
                <h1>Pixel Canvas</h1>

                <div id="pixel-canvas">{ renderPixelCanvas() }</div>


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