export const DPad = ({buttonUp, buttonDown, screenNumber}) => {

    //TODO: Disable the buttons when there's no screens to scroll to
    return (
        <div id="dex-left-controls-arrow-keys">
            <div id="dex-left-controls-arrow-up" onClick={screenNumber === 1 ? null : buttonUp}></div>
            <div id="dex-left-controls-arrow-down" onClick={screenNumber === 2 ? null : buttonDown}></div>
            <div id="dex-left-controls-mid"></div>
            <div id="dex-left-controls-arrow-left"></div>
            <div id="dex-left-controls-arrow-right"></div>
        </div>
    );
}