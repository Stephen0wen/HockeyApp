import { createContext, useState } from "react";

export const MyFixtureContext = createContext();

export const MyFixtureProvider = ({ children }) => {
    const [currentFixtureId, setCurrentFixtureId] = useState(null);

    return (
        <MyFixtureContext.Provider
            value={{ currentFixtureId, setCurrentFixtureId }}
        >
            {children}
        </MyFixtureContext.Provider>
    );
};
