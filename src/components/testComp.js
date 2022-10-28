import React, {useEffect, useState} from "react";

export const DPad = () => {
    const [scroll, setScroll] = useState(0);
    const [screenNumber, setScreenNumber] = useState(1);

    useEffect(() => {
        setScroll(0)
        setScreenNumber(1)
    })

    const scrollUp = () => {
        setScroll(scroll + 6.5)
        setScreenNumber(screenNumber - 1);
        console.log("Test")
    }

    const scrollDown = () => {
        setScroll(scroll - 6.5)
        setScreenNumber(screenNumber + 1);
    }
    return (
        <div id="dex-left-controls-arrow-keys">
            <div id="dex-left-controls-arrow-up" onClick={scrollUp}></div>
            <div id="dex-left-controls-arrow-down"></div>
            <div id="dex-left-controls-mid"></div>
            <div id="dex-left-controls-arrow-left"></div>
            <div id="dex-left-controls-arrow-right"></div>
        </div>
    );
}