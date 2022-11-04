import React, {createRef, useContext, useEffect, useState} from "react";
import EntryContext from "./EntryContext";

export const Entries = ({entryData, ScreenNumber, PMargin}) => {
    const targetRef = createRef();
    const [maxScreen, setMaxScreen] = useState(null);
    let [screenContext, setScreenContext] = useContext(EntryContext)

    useEffect(() => {
        GetMaxScreens()
    })

    function GetMaxScreens(){
        const greenScreen = document.querySelector("#dex-left-green-screen-text");
        const entryDivided = (targetRef.current.offsetHeight - 3) / greenScreen.clientHeight

        setScreenContext(Math.ceil(entryDivided))
        setMaxScreen(Math.ceil(entryDivided))
        console.log("Max screen: " + maxScreen, screenContext)
        // test.setTest.max(2)
        // test.max = Math.ceil(entryDivided)

        console.log("MaxScreen: " + Math.ceil(entryDivided), screenContext)
    }

    const pMarginTop = {
        marginTop: PMargin + "em",
    }

    return (
        <>
            <p id="poke-entry" ref={targetRef} style={pMarginTop}>
                {entryData}
            </p>
            <div id="dex-left-green-screen-arrows" style={{justifyContent: ScreenNumber === 1 ? 'end' : 'space-between'}}>
                <div id="arrow-up" style={{display: ScreenNumber === 1 ? 'none' : 'block'}} ></div>
                <div id="arrow-down" style={{display: ScreenNumber >= maxScreen ? 'none' : 'block'}}></div>
            </div>
        </>
    );
}