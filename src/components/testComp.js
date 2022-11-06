export const DPad = ({buttonUp, buttonDown, screenNumber, maxScreen}) => {

    console.log("DPad max screen: " + parseInt(maxScreen))

    return (
        <div id="dex-left-controls-arrow-keys">
            <div id="dex-left-controls-arrow-up" onClick={screenNumber === 1 ? null : buttonUp}></div>
            <div id="dex-left-controls-arrow-down" onClick={screenNumber === parseInt(maxScreen) ? null : buttonDown}></div>
            <div id="dex-left-controls-mid"></div>
            <div id="dex-left-controls-arrow-left"></div>
            <div id="dex-left-controls-arrow-right"></div>
        </div>
    );
}