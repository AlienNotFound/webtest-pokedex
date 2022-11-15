import React, {useContext} from "react";
import { useState } from "react";
import TestContext from "../contexts/testContext";

export const SuggestionChild = ({text, selected}) => {
    const [someTest, setSomeTest] = useContext(TestContext)
    const [hover, setHover] = useState(false)

    const suggestionClick = (e) => {
        const pContent = e.currentTarget.textContent;
        console.log("Name: ", someTest)
        setSomeTest(pContent)
    }

    const onHover = () => {       
        if (!hover) {
            setHover(true)
        } else {
            setHover(false)
        }
    }

    const hoverStyle = {
        backgroundColor: hover ? '#fff2' : '#222',
        cursor: hover ? 'pointer' : 'default'
    }

    const arrowStyle = {
        backgroundColor: selected ? '#fff2' : '#222',
        cursor: selected ? 'pointer' : 'default'
    }

    return (
        <>
            {text && (
                <div className="suggestionChild" 
                style={hover ? hoverStyle : arrowStyle}
                onClick={suggestionClick}
                onMouseEnter={onHover}
                onMouseLeave={onHover}
                // style={{backgroundColor: selected ? '#fff2' : '#222'}}
                >{text}</div>
            )}
        </>
    );
}