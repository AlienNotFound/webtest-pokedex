import React, {useState, useEffect} from "react"

export function GetData() {
    const [data, setData] = useState(null)
    const [search, setSearch] = useState("")
    const [screen, setScreen] = useState(1)
    const [pMarginTop, setPMarginTop] = useState(0)
    const [error, setError] = useState(null)

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