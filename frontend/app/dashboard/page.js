"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getCurrentUser, logoutUser } from "../../lib/auth";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    getCurrentUser()
      .then(setUser)
      .catch(() => setUser(null));
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
      router.push("/login");
    } catch (err) {
      alert("Logout failed.");
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-600 text-lg">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow space-y-6">
      {/* Header section with welcome + logout */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Welcome, {user.name}!
          </h1>
          <p className="text-sm text-gray-600">
            You are logged in as{" "}
            <span className="font-medium">{user.role}</span>.
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow"
        >
          Logout
        </button>
      </div>

      {/* Common Link: Profile */}
      <div className="space-y-4">
        <Link
          href="/dashboard/profile"
          className="block bg-blue-600 hover:bg-blue-700 text-white text-center px-4 py-2 rounded-md shadow"
        >
          View / Edit Your Profile
        </Link>

        {/* Admin-only: Manage Users */}
        {user.role === "admin" && (
          <>
            <Link
              href="/dashboard/users"
              className="block bg-green-600 hover:bg-green-700 text-white text-center px-4 py-2 rounded-md shadow"
            >
              Manage All Users
            </Link>

            <Link
              href="/dashboard/users/new"
              className="block bg-yellow-500 hover:bg-yellow-600 text-white text-center px-4 py-2 rounded-md shadow"
            >
              Register New User
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
