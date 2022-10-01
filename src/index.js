import React, { useState, useEffect } from "react"
import "./style.css"
const ReactDOM = require('react-dom/client');

const App = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState({
        slug: "",
    });

    const handleChange = (event) => {
        if (event.key === 'Enter') {
            setSearch(({...search, slug: event.target.value}))
            console.log("Search: " + event.target.value)
        }
    }

    //Fetch
    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${search.slug}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP Error: ${response.status}`);
                }
                return response.json()
            })
            .then((actualData) => {
                if(search.slug !== "") {
                    setData(actualData);
                    setError(null);
                }
            })
            .catch((err) => {
                setError(err.message);
                setData(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [search.slug]);

    console.log(data)

    return <div className="App">
        <h1>Search</h1>
        {loading && <p>Just a moment!</p>}
        {error && (
            <div>
                <p>{`Couldn't find`} <strong>${search.slug}</strong> {`. Try again.`}</p>
                <p>{`Error: ${error}`}</p>
            </div>
        )}
        <input type="text" id="pokemonInput" onKeyDown={handleChange} defaultValue={""}/>

        <div id="pokedex">
            <div id="dex-top-row">
                <div id="dex-left-header1">
                        <div id="dex-left-bluelight"></div>
                        <div id="dex-left-threelights">
                            <div className="threelight red"></div>
                            <div className="threelight yellow"></div>
                            <div className="threelight green"></div>
                        </div>
                </div>
                <div id="dex-right-header"></div>
            </div>
            <div id="dex-bottom-row">
                <div id="dex-left">
                    {/*<div id="dex-left-header">*/}
                    {/*    <div id="dex-left-bluelight"></div>*/}
                    {/*    <div id="dex-left-threelights">*/}
                    {/*        <div className="threelight red"></div>*/}
                    {/*        <div className="threelight yellow"></div>*/}
                    {/*        <div className="threelight green"></div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <div id="screen1-border">
                        <div id="top-lights-box">
                            <div className="top-lights"></div>
                            <div className="top-lights"></div>
                        </div>
                        <div id="screen1">
                            <img src="./133.png" alt="eevee"/>
                        </div>
                        <div id="bottom-lights-box">
                            <div id="bottom-light"></div>
                            <div id="bottom-speaker"></div>
                        </div>
                    </div>
                </div>
                <div id="dex-mid"></div>
                <div id="dex-right">
                    <div id="black-screen">
                        <h2>eevee #133</h2>
                        {/*{data && (*/}
                        {/*    <h2>{data.name} #{data.id}</h2>*/}
                        {/*    )}*/}
                    </div>
                    <div id="blue-buttons"></div>
                </div>
            </div>
        </div>
    </div>
};

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
