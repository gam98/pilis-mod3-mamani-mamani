import { createContext, useState } from "react";

export const UserContext = createContext({
  currentUser: {},
  setCurrentUser: () => {}
})

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}