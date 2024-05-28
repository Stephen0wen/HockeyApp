import { createContext, useState } from "react";

export const MyFixtureContext = createContext();

export const MyFixtureProvider = ({ children }) => {
    const [currentFixture, setCurrentFixture] = useState({});

    return (
        <MyFixtureContext.Provider
            value={{ currentFixture, setCurrentFixture }}
        >
            {children}
        </MyFixtureContext.Provider>
    );
};
