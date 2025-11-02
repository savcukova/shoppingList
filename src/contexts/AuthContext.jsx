import { createContext, useContext, useState } from "react";
import { MOCK_USERS } from "../data/mockData.js";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  const login = (email, password) => {
    console.log("Signing in user: ", email);
    const foundUser = MOCK_USERS.find(
      (user) => user.email === email && user.password === password
    );

    if (!foundUser) {
      alert("Invalid email or password");
      return false;
    }

    const user = {
      id: foundUser.user_id,
      email: foundUser.email,
      name: foundUser.name,
    };

    setCurrentUser(user);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    login,
    logout,
    isAuthenticated: !!currentUser,
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
