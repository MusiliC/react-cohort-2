// ProtectedContent.js
import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext"; // Import useAuth

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

export default ProtectedContent;
