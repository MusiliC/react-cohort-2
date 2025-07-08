// AuthContext.js
import { createContext, useContext } from "react";

// 1. Auth Context
// This context will hold our authentication state and functions.
export const AuthContext = createContext(null);

// Auth -> Authentication
// testContext

// 2. useAuth Custom Hook
// This hook provides a convenient way to access authentication state and methods.
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
