// AuthContent.js
import React from "react";
import { useAuth } from "./AuthContext"; // Import useAuth
import LoginForm from "./LoginForm"; // Import LoginForm
import ProtectedContent from "./ProtectedContent"; // Import ProtectedContent

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

export default AuthContent;
