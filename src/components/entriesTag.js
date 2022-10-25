import React, {createRef, useEffect, useState} from "react";

export const Entries = ({entryData}) => {
    const targetRef = createRef();
    const [maxScreen, setMaxScreen] = useState(null);
    const [scroll, setScroll] = useState(0);
    const [screenNumber, setScreenNumber] = useState(1);

    useEffect(() => {
        setScroll(0)
        setScreenNumber(1)
        GetMaxScreen()
    }, [entryData])

    function GetMaxScreen(){
        const greenScreen = document.querySelector("#dex-left-green-screen-text");
        const entryDivided = (targetRef.current.offsetHeight - 3) / greenScreen.clientHeight

        setMaxScreen(Math.ceil(entryDivided))

        console.log("MaxScreen: " + Math.ceil(entryDivided))
    }

    const scrollUp = () => {
        setScroll(scroll + 6.5)
        setScreenNumber(screenNumber - 1);
    }

    const scrollDown = () => {
        setScroll(scroll - 6.5)
        setScreenNumber(screenNumber + 1);
    }

    const scrollStyle = {
        marginTop: scroll + "em",
    }

    return (
        <>
            <p id="poke-entry" ref={targetRef} style={scrollStyle}>
                {entryData}
            </p>
            <div id="dex-left-green-screen-arrows" style={{justifyContent: screenNumber === 1 ? 'end' : 'space-between'}}>
                <div id="arrow-up" onClick={scrollUp} style={{display: screenNumber === 1 ? 'none' : 'block'}} ></div>
                <div id="arrow-down" onClick={scrollDown} style={{display: screenNumber >= maxScreen ? 'none' : 'block'}}></div>
            </div>
        </>
    );
}