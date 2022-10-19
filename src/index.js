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
        Promise.all([
            fetch(`https://pokeapi.co/api/v2/pokemon/133`),
            fetch(`https://pokeapi.co/api/v2/pokemon-species/133`)
        ]).then(responses => {
            const pokemonRes = responses[0]
            const entryRes = responses[1]

            console.log(pokemonRes.json())

            return pokemonRes.json()
        })
        // fetch(`https://pokeapi.co/api/v2/pokemon/${search.slug}`)
        //     .then((response) => {
        //         if (!response.ok) {
        //             throw new Error(`HTTP Error: ${response.status}`);
        //         }
        //         return response.json()
        //     })
        //     .then((actualData) => {
        //         if(search.slug !== "") {
        //             setData(actualData);
        //             setError(null);
        //         }
        //     })
        //     .catch((err) => {
        //         setError(err.message);
        //         setData(null);
        //     })
        //     .finally(() => {
        //         setLoading(false);
        //     });
    }, [search.slug]);

    console.log(data)

    return <div className="App">
        <h1>Search</h1>
        {error && (
            <div>
                <p>{`Couldn't find`} <strong>${search.slug}</strong> {`. Try again.`}</p>
                <p>{`Error: ${error}`}</p>
            </div>
        )}

        <div id="pokedex">
            <div id="dex-top-row">
                <div id="dex-left-header1">
                        <div id="dex-left-bluelight"></div>
                        <div id="dex-left-threelights">
                            <div className="threelights red"></div>
                            <div className="threelights yellow"></div>
                            <div className="threelights green"></div>
                        </div>
                </div>
                <div id="dex-right-header">
                    <div id="dex-right-header-top"></div>
                    <div id="dex-right-header-bottom"></div>
                </div>
            </div>
            <div id="dex-bottom-row">
                <div id="dex-left">
                    <div id="dex-left-inner-border">
                        <div id="screen1-border">
                            <div id="top-lights-box">
                                <div className="top-lights"></div>
                                <div className="top-lights"></div>
                            </div>
                            <div id="screen1">
                                {data && (
                                    <img src={data.sprites.other['official-artwork'].front_default} alt="Artwork not found." />
                                )}
                            </div>
                            <div id="bottom-lights-box">
                                <div id="bottom-light"></div>
                                <div id="bottom-speaker"></div>
                            </div>
                        </div>
                        <div id="dex-left-controls">
                            <div id="dex-left-controls-col1">
                                <div id="dex-left-controls-col1-button"></div>
                            </div>
                            <div id="dex-left-controls-col2">
                                <div id="dex-left-controls-col2-row1">
                                    <div className="dex-left-controls-long-light red"></div>
                                    <div className="dex-left-controls-long-light blue"></div>
                                </div>
                                {/*<div id="dex-left-controls-col2-row2">*/}
                                    <div id="dex-left-controls-green-screen" className="lightgreen">
                                        {/*{data && (*/}
                                        {/*    <p>{data.}</p>*/}
                                        {/*)}*/}
                                    </div>
                                {/*</div>*/}
                            </div>
                            <div id="dex-left-controls-col3">
                                <div id="dex-left-controls-arrow-keys"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="dex-mid"></div>
                <div id="dex-right">
                    <div id="black-screen">
                        {loading && <h2>Just a moment!</h2>}
                        <input type="text" id="pokemonInput"
                               onKeyDown={handleChange}
                               placeholder={"Search"}
                               defaultValue={""}
                            {...(loading && {className:'hidden'})}
                        />
                        {data && (
                            <h2>{data.name} #{data.id}</h2>
                            )}
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
