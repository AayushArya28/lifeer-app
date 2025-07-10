import React from "react";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen px-4 py-10 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">👤 Profile</h2>
        {user ? (
          <div className="space-y-4">
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>User ID:</strong> {user.uid}</p>
            {/* Add more user details here if needed */}
          </div>
        ) : (
          <p>Loading user info...</p>
        )}
      </div>
    </div>
  );
}
