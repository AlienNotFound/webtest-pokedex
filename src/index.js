import React, {useState, useEffect, useContext} from "react"
import "./styles/style.css"
import "./styles/types.css"
import {Entries} from "./components/entriesComp";
import {BlueButtonsControl} from "./components/blueButtonsControl";
import {DPad} from "./components/dpadComp";
import EntryContext from "./contexts/entryContext";
import { SuggestionChild } from "./components/suggestionChildComp";
import { GetData } from "./apiEndpoints";
import TestContext from "./contexts/testContext";
import { createContext } from "react";
const ReactDOM = require('react-dom/client');

const App = () => {
    const [data, setData] = useState(null)
    const [pokemons, setPokemons] = useState([])
    const [suggestions, setSuggestions] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [search, setSearch] = useState("")
    const [screen, setScreen] = useState(1)
    const [pMarginTop, setPMarginTop] = useState(0)
    const [active, setActive] = useState(0)
    const maxScreens = useState(null)
    const testSearch = useState(null)

    // const SomeContext = useContext(TestContext)
    // const [someSearch, setSomeSearch] = useState("some test")

    const handleChange = (event) => {
        if (event.key === 'Enter') {
            setSearch(event.target.value)
            console.log("Search: " + event.target.value)
        }

        if (event.key === 'Escape')
            setSuggestions(null)
    }

    const onInputChange = (e) => {
        let matches = []
        if(e.length !== 0) {
            matches = pokemons.filter(pokemon => {
                const regex = new RegExp(e.target.value, "gi");
                return pokemon.name.match(regex)
            })
            matches.sort((a, b) =>
                a.name > b.name ? 1 : -1,
            );
            console.log(matches)
            setSuggestions(matches)
        }
        setActive(0)
    }

    //Fetch
    useEffect(() => {
        //Easteregg: shiny pokémon
        const getData = () =>
        {
            try {
                Promise.all([
                    fetch(`https://pokeapi.co/api/v2/pokemon/${search}`),
                    fetch(`https://pokeapi.co/api/v2/pokemon-species/${search}`),
                ]).then((responses) => {
                    return Promise.all(responses.map((res) => {
                        return res.json();
                    }));
                }).then((responseData) => {
                    if(search !== "") {
                        setScreen(1)
                        setPMarginTop(0)
                        setData(responseData)
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

    let pokeArr = []
    useEffect(() => {
        try {
            Promise.all([
                fetch(`https://pokeapi.co/api/v2/pokemon/?limit=2000`),
            ]).then((responses) => {
                return Promise.all(responses.map((res) => {
                    return res.json();
                }));
            }).then((responseData) => {
                for(let i = 0; i < responseData[0].results.length; i++) {
                    pokeArr.push(responseData[0].results[i].name)
                }
                setPokemons(responseData[0].results)
                if(search !== "") {
                    setError(null)
                }
            })
        }
        catch (e) {
            console.log(e)
        }
    }, [])

    const arrowPress = (e) => {
        if(e.key === 'ArrowUp') {
            e.preventDefault();
            if(active > 0)
            setActive(active - 1)
            console.log(active);
        }
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if(active < suggestions.length - 1)
                setActive(active + 1)
            
            console.log(active);
        }
        if(e.key === 'Enter') {
            setSearch(suggestions[active].name)
            console.log(suggestions[active].name, active)
            if(search)
                setSuggestions(null)
        }
    }

    useEffect(() => {
        if(testSearch[0]) {
            setSearch(testSearch[0])
        }
    }, [testSearch[0]])

    useEffect(() => {
        document.addEventListener('keydown', arrowPress)
        return () => document.removeEventListener('keydown', arrowPress)
    }, [arrowPress])

    const ScrollUp = () => {
        setPMarginTop(pMarginTop + 6.5)
        setScreen(screen - 1)
    }

    const ScrollDown = () => {
        setPMarginTop(pMarginTop - 6.5)
        setScreen(screen + 1)
    }

    return <div className="App">
        {error && (
            <div>
                <p>{`Couldn't find`} <strong>${search}</strong> {`. Try again.`}</p>
                <p>{`Error: ${error}`}</p>
            </div>
        )}

        <TestContext.Provider value={testSearch}>
            <div id="suggestionsList" style={{display: suggestions > 0 ? 'none' : 'block'}} tabIndex={0}>
                {suggestions && suggestions.map((suggestion, id) => (
                    <SuggestionChild key={id} text={suggestion.name} selected={active === id ? true : false} />
                ))}
            </div>
        </TestContext.Provider>

        <div id="pokedex">
            <div id="dex-left-column">
                <div id="dex-left-top-row">
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

                <div className="dex-bottom-row">
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
                                <EntryContext.Provider value={maxScreens}>
                                    <div id="dex-left-controls-col2">
                                        <div id="dex-left-controls-col2-row1">
                                            <div className="dex-left-controls-long-light red"></div>
                                            <div className="dex-left-controls-long-light blue"></div>
                                        </div>
                                            <div id="dex-left-controls-green-screen" className="lightgreen">
                                                <div id="dex-left-green-screen-text">
                                                    {data && (
                                                        <Entries entryData={data[1].flavor_text_entries[0].flavor_text} ScreenNumber={screen} PMargin={pMarginTop} />
                                                    )}
                                                </div>
                                            </div>
                                    </div>
                                    <div id="dex-left-controls-col3">
                                        <DPad
                                            buttonUp={ScrollUp}
                                            buttonDown={ScrollDown}
                                            screenNumber={screen}
                                            maxScreen={maxScreens}
                                        />
                                    </div>
                                </EntryContext.Provider>
                            </div>
                        </div>
                    </div>
                    <div id="dex-mid"></div>

                </div>
            </div>
            <div id="dex-right-column">
                <div id="dex-right-top-row"></div>
                <div className="dex-bottom-row">
                <div id="dex-right">
                    <div id="dex-right-inner-border">
                        <div className="dex-right-row">
                            <div id="black-screen">
                                {loading && <h2>Just a moment!</h2>}
                                <input type="text" id="pokemonInput"
                                       onKeyDown={handleChange}
                                       onChange={onInputChange}
                                       placeholder={"Search"}
                                       {...(loading && {className:'hidden'})}
                                />
                                {data && (
                                    <h2>#{data[0].id}</h2>
                                )}
                            </div>
                        </div>
                        <div className="dex-right-row">
                            <BlueButtonsControl />
                        </div>
                        <div className="dex-right-row">
                            <div className="slim-black-button"></div>
                            <div className="slim-black-button"></div>
                        </div>
                        <div className="dex-right-row">
                            <div id="white-buttons">
                                <div className="white-button"></div>
                                <div className="white-button"></div>
                            </div>
                            <div id="yellow-round-button" className={"yellow"}></div>
                        </div>
                        <div className="dex-right-row">
                            <div className="small-black-screen">
                                {data && (
                                    <p className={data[0].types[0].type.name + "-type type-label"}>{data[0].types[0].type.name}</p>
                                )}
                            </div>
                            <div className="small-black-screen">
                                {data && data[0].types[1] && (
                                    <p className={data[0].types[1].type.name + "-type type-label"}>{data[0].types[1].type.name}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>
};

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <App />
)
