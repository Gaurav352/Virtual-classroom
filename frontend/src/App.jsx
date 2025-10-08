import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./zustand/authStore";
import { Toaster } from "react-hot-toast";
import { Loader } from "lucide-react";

// Pages
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Analyze from "./pages/Analyze";

function App() {
  const { getMe, isCheckingAuth, authUser } = useAuthStore();

  // Check auth on app load
  useEffect(() => {
    getMe();
  }, [getMe]);

  // Show loading spinner while auth is being checked
  if (isCheckingAuth)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="h-12 w-12 animate-spin text-[#64FFDA]" />
      </div>
    );

  return (
    <>
      {/* Toast notifications */}
      <Toaster position="top-right" />

      <Routes>
        {/* Public route */}
        <Route path="/" element={<LandingPage />} />

        {/* Protected analyze route */}
        <Route
          path="/analyze"
          element={authUser ? <Analyze /> : <Navigate to="/login" />}
        />

        {/* Login route */}
        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to="/analyze" />}
        />

        {/* Register route */}
        <Route
          path="/register"
          element={!authUser ? <Register /> : <Navigate to="/analyze" />}
        />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
