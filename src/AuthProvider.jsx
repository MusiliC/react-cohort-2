// AuthProvider.js
import React, { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext"; // Import AuthContext

// Auth Provider Component
// This component wraps the application and provides the authentication context.
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // Stores user details (e.g., username, role)
  const [loading, setLoading] = useState(true); // To manage initial loading state

  // Simulate initial authentication check (e.g., checking localStorage for a token)
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setIsAuthenticated(true);
        setUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("currentUser"); // Clear invalid data
      }
    }
    setLoading(false); // Authentication check complete
  }, []);

  // Simulate a login process
  const login = async (username, password) => {
    setLoading(true);
    // In a real app, you'd send these to a backend API
    // For this simulation, we'll use hardcoded credentials and roles
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate network delay
        if (username === "user" && password === "password") {
          const userData = { username: "user", role: "viewer" };
          setIsAuthenticated(true);
          setUser(userData);
          localStorage.setItem("currentUser", JSON.stringify(userData));
          resolve({ success: true, user: userData });
        } else if (username === "admin" && password === "adminpass") {
          const userData = { username: "admin", role: "editor" };
          setIsAuthenticated(true);
          setUser(userData);
          localStorage.setItem("currentUser", JSON.stringify(userData));
          resolve({ success: true, user: userData });
        } else {
          setIsAuthenticated(false);
          setUser(null);
          localStorage.removeItem("currentUser");
          resolve({ success: false, message: "Invalid credentials" });
        }
        setLoading(false);
      }, 500);
    });
  };

  // Simulate a logout process
  const logout = () => {
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate network delay
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem("currentUser");
        setLoading(false);
        resolve({ success: true });
      }, 300);
    });
  };

  const authContextValue = {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
