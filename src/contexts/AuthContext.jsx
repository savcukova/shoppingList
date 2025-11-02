import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { MOCK_USERS } from "../data/mockData.js";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const login = (email, password) => {
    console.log("Signing in user: ", email);
    const foundUser = MOCK_USERS.find(
      (user) => user.email === email && user.password === password
    );

    setCurrentUser(foundUser);
    navigate("/shopping-lists/a44bbf9b8bc39g632f53c245");
  };

  const logout = () => {
    setCurrentUser(null);
    navigate("/login");
  };

  const value = {
    currentUser,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return context;
};
