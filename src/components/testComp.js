// import React, {useEffect, useState} from "react";

export const DPad = ({buttonUp, buttonDown}) => {

    //TODO: Disable the buttons when there's no screens to scroll to
    return (
        <div id="dex-left-controls-arrow-keys">
            <div id="dex-left-controls-arrow-up" onClick={buttonUp}></div>
            <div id="dex-left-controls-arrow-down" onClick={buttonDown}></div>
            <div id="dex-left-controls-mid"></div>
            <div id="dex-left-controls-arrow-left"></div>
            <div id="dex-left-controls-arrow-right"></div>
        </div>
    );
}