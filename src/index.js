import React, {useState, useEffect} from "react"
import "./style.css"
import {Entries} from "./components/entriesTag";
const ReactDOM = require('react-dom/client');

const App = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState({
        slug: "",
    });
    // const [scroll, setScroll] = useState(0);
    // const [screenNumber, setScreenNumber] = useState(1);
    // const [maxScreen, setMaxScreen] = useState(null);
    // const targetRef = createRef();

    const handleChange = (event) => {
        if (event.key === 'Enter') {
            setSearch(({...search, slug: event.target.value}))
            console.log("Search: " + event.target.value)
        }
    }

    //`https://pokeapi.co/api/v2/pokemon/${search.slug}`
    // `https://pokeapi.co/api/v2/pokemon-species/${search.slug}`]

    //Fetch
    useEffect(() => {
        console.log("fooooo")
        const getData = () =>
        {
            try {
                Promise.all([
                    fetch(`https://pokeapi.co/api/v2/pokemon/${search.slug}`),
                    fetch(`https://pokeapi.co/api/v2/pokemon-species/${search.slug}`)
                ]).then((responses) => {
                    return Promise.all(responses.map((res) => {
                        return res.json();
                    }));
                }).then((test) => {
                    if(search.slug !== "") {
                        setData(test)
                        setError(null)
                    }
                })
            }
            catch (e) {
                console.log(e)
            }
        }

        getData()
        setLoading(false);

    }, [search]);

    return <div className="App">
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
                                    <img src={data[0].sprites.other['official-artwork'].front_default} alt="Artwork not found." />
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
                                        <div id="dex-left-green-screen-text">
                                            {/*<p id="poke-entry" ref={targetRef} style={scrollStyle} >Linoone always runs full speed and only in straight lines. If facing an obstacle, it makes a</p>*/}
                                            {/*<p id="poke-entry" ref={targetRef} style={scrollStyle}>*/}
                                            {/*    {data && (*/}
                                            {/*            <>{data[1].flavor_text_entries[0].flavor_text}</>*/}
                                            {/*    )}*/}
                                            {/*</p>*/}
                                            {data && (
                                                <Entries entryData={data[1].flavor_text_entries[0].flavor_text}/>
                                            )}
                                            {/*<div id="dex-left-green-screen-arrows" style={{justifyContent: screenNumber === 1 ? 'end' : 'space-between'}}>*/}
                                            {/*    <div id="arrow-up" onClick={scrollUp} style={{display: screenNumber === 1 ? 'none' : 'block'}} ></div>*/}
                                            {/*    <div id="arrow-down" onClick={scrollDown} style={{display: screenNumber >= maxScreen ? 'none' : 'block'}}></div>*/}
                                            {/*</div>*/}
                                        </div>
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
                            <h2>{data[0].name} #{data[0].id}</h2>
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
    <App></App>
    // <React.StrictMode>
    //     <App />
    // </React.StrictMode>,
)
