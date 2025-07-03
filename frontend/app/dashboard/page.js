"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getCurrentUser } from "../../lib/auth";

export default function DashboardPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getCurrentUser()
      .then(setUser)
      .catch(() => setUser(null));
  }, []);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-600 text-lg">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">
          Welcome, {user.name}!
        </h1>
        <p className="text-sm text-gray-600">
          You are logged in as <span className="font-medium">{user.role}</span>.
        </p>
      </div>

      <div className="space-y-4">
        {/* Always visible: View/edit profile */}
        <Link
          href="/dashboard/profile"
          className="block bg-blue-600 hover:bg-blue-700 text-white text-center px-4 py-2 rounded-md shadow"
        >
          View / Edit Your Profile
        </Link>

        {/* Admin-only: Link to all users */}
        {user.role === "admin" && (
          <Link
            href="/dashboard/users"
            className="block bg-green-600 hover:bg-green-700 text-white text-center px-4 py-2 rounded-md shadow"
          >
            Manage All Users
          </Link>
        )}
      </div>
    </div>
  );
}
