import React, {createRef, useContext, useEffect} from "react";
import EntryContext from "./EntryContext";

export const Entries = ({entryData, ScreenNumber, PMargin}) => {
    const targetRef = createRef();
    let [screenContext, setScreenContext] = useContext(EntryContext)

    useEffect(() => {
        GetMaxScreens()
    })

    function GetMaxScreens(){
        const greenScreen = document.querySelector("#dex-left-green-screen-text");
        const entryDivided = (targetRef.current.offsetHeight - 3) / greenScreen.clientHeight

        setScreenContext(Math.ceil(entryDivided))
        console.log("Max screen: " + screenContext)

        console.log("MaxScreen: " + Math.ceil(entryDivided), screenContext)
    }

    const pMarginTop = {
        marginTop: PMargin + "em",
    }

    const arrowDisabledStyle = {
        backgroundColor: '#459163',
        animationPlayState: 'paused',
    }

    const arrowEnabledStyle = {
        backgroundColor: '#2f5f42',
    }

    return (
        <>
            <p id="poke-entry" ref={targetRef} style={pMarginTop}>
                {entryData}
            </p>
            <div id="dex-left-green-screen-arrows" >
                <div id="arrow-up" style={ScreenNumber === 1 ? arrowDisabledStyle : arrowEnabledStyle} ></div>
                {/*<div id="green-screen-arrow-spacer"></div>*/}
                <div id="arrow-down" style={ScreenNumber >= screenContext ? arrowDisabledStyle : arrowEnabledStyle}></div>
            </div>
        </>
    );
}