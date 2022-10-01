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
        <h1>Search for 'mons!</h1>
        {loading && <p>Just a moment!</p>}
        {error && (
            <div>
                <p>{`Couldn't find`} <strong>${search.slug}</strong> {`. Try again.`}</p>
                <p>{`Error: ${error}`}</p>
            </div>
        )}
        <input type="text" id="pokemonInput" onKeyDown={handleChange} defaultValue={""}/>

        <h1>Eevee</h1>
        <div id="dex-left">
            <div id="dex-left-header">
                <div id="dex-left-bluelight"></div>
                <div id="dex-left-threelights">
                    <div className="threelight red"></div>
                    <div className="threelight yellow"></div>
                    <div className="threelight green"></div>
                </div>
            </div>
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
        <p>133</p>

        {data && (
            <div>
                <h1>{data.name}</h1>
                <div id="screen1">
                    <img src="public/133.png" alt="eevee"/>
                    {/*<img src={Object.values(data.sprites.other['official-artwork'])[0].toString()} alt="test"/>*/}
                </div>
                <p>{data.id}</p>
            </div>
        )}
    </div>
};

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
