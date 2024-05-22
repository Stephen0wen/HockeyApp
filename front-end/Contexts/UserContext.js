import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        user_id: 1,
        team_id: 2,
        user_name: "Alfie Fenables",
        team_name: "Leicester Wolves",
        user_role: ["player", "secretary"],
        user_address_1: "10 Downing St",
        user_address_2: "London",
        user_postcode: "BR23 2XU",
        user_dob: "15/02/2000",
        user_phone: "1234567",
    });
    const [userRole, setUserRole] = useState("public");

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                userRole,
                setUserRole,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
