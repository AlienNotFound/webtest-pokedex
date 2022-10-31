import React, {useEffect} from "react";

export const BlueButtonsControl = () => {

    useEffect(() => {
    })

    const buttons = []
    for (let i = 0; i < 10; i++) {
        buttons.push(<div className={"blueButton"}></div> )
    }

    return (
        <>
            {buttons}
        </>
    );
}