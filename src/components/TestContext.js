import React, { createContext, useState } from "react";

export const TestContext = createContext();

const TestContextProvider = (props) => {
    const [test, setTest] = useState({
        max: null,
    });

    return(
        <TestContext.Provider value={test}>
            {props.children}
        </TestContext.Provider>
    )
}

export default TestContextProvider