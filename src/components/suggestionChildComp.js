import React, {useContext} from "react";
import TestContext from "../contexts/testContext";

export const SuggestionChild = ({text, selected}) => {
    let [testSearch, setTestSearch] = useContext([TestContext])

    const suggestionClick = (e) => {
        const pContent = e.currentTarget.textContent;
        console.log("Name: ", pContent)
        setTestSearch(pContent)
        // console.log("Set: ", testSearch);
        // setSuggestions(null)
    }

    return (
        <>
            {text && (
                <div className="suggestionChild" 
                onClick={suggestionClick}
                style={{backgroundColor: selected ? '#fff2' : '#222'}}
                >{text}</div>
            )}
        </>
    );
}