import { createContext, useContext, useState, useEffect } from "react";
import * as api from "../api.js";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing token on mount
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userData = localStorage.getItem("userData");
    if (token && userData) {
      try {
        setCurrentUser(JSON.parse(userData));
      } catch {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userData");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.login({ email, password });

      if (response.status === "success" && response.data?.user) {
        const user = response.data.user;
        setCurrentUser(user);
        localStorage.setItem("userData", JSON.stringify(user));
        return true;
      } else {
        alert("Login failed");
        return false;
      }
    } catch (err) {
      const errorMessage = err.data?.message || err.message || "Login failed";
      alert(errorMessage);
      return false;
    }
  };

  const register = async (email, password, name) => {
    try {
      const response = await api.register({ email, password, name });

      if (response.status === "success" && response.data?.user) {
        const user = response.data.user;
        setCurrentUser(user);
        localStorage.setItem("userData", JSON.stringify(user));
        return true;
      } else {
        alert("Registration failed");
        return false;
      }
    } catch (err) {
      const errorMessage =
        err.data?.message || err.message || "Registration failed";
      alert(errorMessage);
      return false;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    isAuthenticated: !!currentUser,
    isLoading,
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
