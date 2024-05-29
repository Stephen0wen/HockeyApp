import { createContext, useState } from "react";

export const MyFixtureContext = createContext();

export const MyFixtureProvider = ({ children }) => {
    const [currentFixture, setCurrentFixture] = useState({});
    const [myResponses, setMyResponses] = useState([]);

    return (
        <MyFixtureContext.Provider
            value={{
                currentFixture,
                setCurrentFixture,
                myResponses,
                setMyResponses,
            }}
        >
            {children}
        </MyFixtureContext.Provider>
    );
};
