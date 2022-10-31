import React, {createRef, useEffect, useState} from "react";

export const Entries = ({entryData, ScreenNumber, PMargin}) => {
    const targetRef = createRef();
    const [maxScreen, setMaxScreen] = useState(null);

    useEffect(() => {
        GetMaxScreens()
    }, [entryData, PMargin])

    function GetMaxScreens(){
        const greenScreen = document.querySelector("#dex-left-green-screen-text");
        const entryDivided = (targetRef.current.offsetHeight - 3) / greenScreen.clientHeight

        setMaxScreen(Math.ceil(entryDivided))

        console.log("MaxScreen: " + Math.ceil(entryDivided))
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