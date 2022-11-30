import React, {useEffect} from "react";
import MagnifyingGlass from "../icons/magnifying-glass-solid.svg"

export const BlueButtonsControl = () => {

    useEffect(() => {
    })

    const buttons = []
    const icons = [
        MagnifyingGlass, 
        'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'
    ]
    for (let i = 0; i < 10; i++) {
        buttons.push(<div className={"blueButton"} key={i}>
                <img src={icons[i]} alt={icons[i]} />
            </div> 
            )}

    return (
        <>
            {buttons}
        </>
    );
}