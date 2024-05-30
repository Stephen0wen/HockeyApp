import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
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
