"use client";

import { useEffect, useState } from "react";
import { fetchUsers } from "@/lib/auth";
import Link from "next/link";
import { getCookie } from "@/utils/cookies";

export default function UsersList() {
  const [users, setUsers] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [error, setError] = useState("");

  // Load all users initially
  useEffect(() => {
    fetchUsers()
      .then(setUsers)
      .catch(() => setUsers([]));
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setSearchResults(null);

    const query = searchQuery.trim();
    if (query.length < 2) {
      setError("Search query must be at least 2 characters.");
      return;
    }

    const csrf = getCookie("csrf_access_token");

    try {
      const res = await fetch(
        // using encodeURI here to ensure to safely insert the search query into URL
        `http://localhost:5000/search?q=${encodeURIComponent(query)}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "X-CSRF-TOKEN": csrf,
          },
        }
      );

      if (!res.ok) {
        const { msg } = await res.json();
        setError(msg || "Search failed.");
        return;
      }

      const data = await res.json();
      setSearchResults(data);
    } catch (err) {
      setError("Failed to connect to server.");
    }
  };

  const usersToRender = searchResults ?? users;

  if (!usersToRender) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* top Bar*/}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">All Users</h1>
        <Link
          href="/dashboard/users/new"
          className="bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-md shadow"
        >
          + Add User
        </Link>
      </div>

      {/* Search Box */}
      <form onSubmit={handleSearch} className="flex gap-4">
        <input
          type="text"
          placeholder="Search by name, email, city..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow border px-4 py-2 rounded-md shadow focus:outline-none focus:ring focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {error && <p className="text-red-600 text-sm">{error}</p>}

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
            {usersToRender.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            ) : (
              usersToRender.map((u) => (
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
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
