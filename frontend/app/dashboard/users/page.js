"use client";

import { useEffect, useState } from "react";
import { fetchUsers } from "../../../lib/auth";
import Link from "next/link";

export default function UsersList() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    fetchUsers()
      .then(setUsers)
      .catch(() => setUsers([]));
  }, []);

  if (!users) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Heading and Add Button */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">All Users</h1>
        <Link
          href="/dashboard/users/new"
          className="bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-md shadow"
        >
          + Add User
        </Link>
      </div>

      {/* User Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
            <tr>
              <th className="text-left px-6 py-3">Name</th>
              <th className="text-left px-6 py-3">Email</th>
              <th className="text-left px-6 py-3">City</th>
              <th className="text-left px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {users.map((u) => (
              <tr
                key={u.id}
                className="border-t hover:bg-gray-50 transition duration-200"
              >
                <td className="px-6 py-4">{u.name}</td>
                <td className="px-6 py-4">{u.email}</td>
                <td className="px-6 py-4">{u.city}</td>
                <td className="px-6 py-4">
                  <Link
                    href={`/dashboard/users/${u.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
