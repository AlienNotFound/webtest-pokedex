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

        {data && (
            <div>
                <h1>{data.name}</h1>
                <img src={Object.values(data.sprites.other['official-artwork'])[0].toString()} alt="test"/>
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
