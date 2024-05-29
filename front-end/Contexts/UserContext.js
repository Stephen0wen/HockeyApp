import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    user_id: 0,
    team_id: 0,
    user_name: "",
    team_name: "",
    user_role: [],
    user_address_1: "",
    user_address_2: "",
    user_postcode: "",
    user_dob: "",
    user_phone: "",
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
