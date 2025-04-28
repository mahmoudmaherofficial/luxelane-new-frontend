"use client";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";
import Cookies from "js-cookie";

// Simulated logout API function (replace with your actual implementation)
const logoutFn = async () => {
  // Example: Make an API call to invalidate the session
  await fetch("/api/logout", { method: "POST" });
  return { success: true };
};

const LogoutPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogout = async () => {
    setLoading(true);
    setError(null);
    try {
      await logoutFn();
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      window.location.replace("/");
    } catch (err) {
      console.error("Logout failed:", err);
      setError("Failed to log out. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Automatically trigger logout on mount
  useEffect(() => {
    handleLogout();
  }, []); // Empty dependency array to run once on mount

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen">
      {loading && <p className="text-primary-500 text-lg">Logging out, please wait...</p>}
      {error && (
        <div className="text-red-500 mb-4">
          <p>{error}</p>
          <Button
            onClick={handleLogout}
            className="mt-4 bg-primary-500 hover:bg-primary-600 text-white"
            disabled={loading}>
            Try Again
          </Button>
        </div>
      )}
      {!loading && !error && (
        <p className="text-primary-500 text-lg">You have been logged out. Redirecting to login...</p>
      )}
    </motion.div>
  );
};

export default LogoutPage;
