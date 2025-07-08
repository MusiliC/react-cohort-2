// App.js
// This file combines all components and hooks into a single file for execution
// within environments that do not support direct cross-file imports between immersives.

import React, { createContext, useContext, useState, useEffect } from "react";

// 1. Auth Context
// This context will hold our authentication state and functions.
const AuthContext = createContext(null);

// 2. useAuth Custom Hook
// This hook provides a convenient way to access authentication state and methods.
const useAuth = () => {
  return useContext(AuthContext);
};

// Auth Provider Component
// This component wraps the application and provides the authentication context.
const AuthProvider = ({ children }) => {
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

// Login Form Component
const LoginForm = () => {
  const { login, loading } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    const result = await login(username, password);
    if (!result.success) {
      setError(result.message);
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Login
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="e.g., user or admin"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="e.g., password or adminpass"
          />
        </div>
        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

// Protected Content Component
const ProtectedContent = ({ allowedRoles = [] }) => {
  const { isAuthenticated, user, loading, logout } = useAuth();
  const [data, setData] = useState(null);
  const [dataLoading, setDataLoading] = useState(false);
  const [dataError, setDataError] = useState("");

  // Simulate fetching data based on user role
  const fetchData = async () => {
    setDataLoading(true);
    setDataError("");
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        if (user && user.role === "editor") {
          setData(
            "This is sensitive data for editors only. You can edit this!"
          );
          resolve({ success: true });
        } else if (user && user.role === "viewer") {
          setData(
            "This is general data for viewers. You can view but not edit."
          );
          resolve({ success: true });
        } else {
          setDataError("You do not have permission to view this data.");
          resolve({ success: false });
        }
        setDataLoading(false);
      }, 700);
    });
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      // Check if the user's role is allowed to view this content
      if (allowedRoles.length === 0 || allowedRoles.includes(user.role)) {
        fetchData();
      } else {
        setDataError("Your role does not permit access to this section.");
      }
    } else {
      setData(null); // Clear data if not authenticated
      setDataError("");
    }
  }, [isAuthenticated, user, allowedRoles]); // Re-fetch if auth state or user/roles change

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <p className="ml-4 text-gray-700">Loading authentication state...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Don't render content if not authenticated, LoginForm will show instead
  }

  // Check role-based authorization
  if (allowedRoles.length > 0 && user && !allowedRoles.includes(user.role)) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl relative shadow-md w-full max-w-2xl text-center">
        <strong className="font-bold">Access Denied!</strong>
        <span className="block sm:inline">
          {" "}
          Your role ({user.role}) does not have permission to view this content.
        </span>
        <button
          onClick={logout}
          className="mt-4 bg-red-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700 transition duration-200 ease-in-out"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Welcome, {user?.username}!
      </h2>
      <p className="text-lg text-gray-600 mb-4">
        Your role:{" "}
        <span className="font-semibold text-blue-600">{user?.role}</span>
      </p>

      {dataLoading ? (
        <div className="flex justify-center items-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
          <p className="ml-3 text-gray-600">Fetching data...</p>
        </div>
      ) : dataError ? (
        <p className="text-red-600 text-md mb-4">{dataError}</p>
      ) : (
        <div className="bg-gray-100 p-6 rounded-lg border border-gray-200 mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-3">
            Your Data:
          </h3>
          <p className="text-gray-800 text-lg">{data}</p>
        </div>
      )}

      <button
        onClick={logout}
        className="bg-red-500 text-white py-2 px-6 rounded-lg font-semibold text-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-200 ease-in-out"
      >
        Logout
      </button>
    </div>
  );
};

// A new component to handle conditional rendering based on auth state,
// ensuring useAuth is called within AuthProvider's children.
const AuthContent = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <p className="ml-4 text-gray-700">Initializing app...</p>
      </div>
    );
  }

  return isAuthenticated ? (
    <ProtectedContent allowedRoles={["viewer", "editor"]} />
  ) : (
    <LoginForm />
  );
};

// Main App Component
export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center p-4 font-sans">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
          body {
            font-family: 'Inter', sans-serif;
          }
        `}
      </style>
      <script src="https://cdn.tailwindcss.com"></script>

      {/* AuthProvider wraps the components that need access to auth context */}
      <AuthProvider>
        <AuthContent /> {/* Render AuthContent inside AuthProvider */}
      </AuthProvider>
    </div>
  );
}
