"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  fetchUserById,
  updateUserById,
  deleteUserById,
} from "../../../../lib/auth";
import UserForm from "../../../../components/UserForm";

export default function UserDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUserById(id)
      .then(setUser)
      .catch(() => router.push("/dashboard/users"));
  }, [id]);

  const onSave = async (data) => {
    try {
      await updateUserById(id, data);
      alert("Saved successfully");
    } catch (err) {
      alert(err.message);
    }
  };

  const onDelete = async () => {
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUserById(id);
        router.push("/dashboard/users");
      } catch (err) {
        alert("Failed to delete user.");
      }
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-600 text-lg">Loading user details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6 bg-white rounded-lg shadow">
      {/* Heading */}
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold text-gray-800">Edit User</h2>
        <p className="text-sm text-gray-500">
          Update user information or delete this user.
        </p>
      </div>

      {/* User Form */}
      <UserForm initialData={user} onSubmit={onSave} />

      {/* Delete Button */}
      <div className="pt-4 border-t border-gray-200">
        <button
          onClick={onDelete}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow-sm"
        >
          Delete User
        </button>
      </div>
    </div>
  );
}
