"use client";

import { useState, useEffect } from "react";
import { getCurrentUser } from "@/lib/auth";

export default function UserForm({ initialData = {}, onSubmit }) {
  const [formData, setFormData] = useState({
    name: initialData.name || undefined,
    email: initialData.email || undefined,
    password: initialData.password || undefined,
    confirm_password: initialData.confirm_password || undefined,
    phone: initialData.phone || undefined,
    city: initialData.city || undefined,
    role: initialData.role || undefined,
    photo_url: initialData.photo_url || undefined,
  });

  const [userRole, setUserRole] = useState("user");

  useEffect(() => {
    async function fetchUser() {
      const user = await getCurrentUser();
      if (user?.role) setUserRole(user.role);
    }
    fetchUser();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Form Group */}
      {[
        { label: "Name", name: "name", type: "text" },
        { label: "Email", name: "email", type: "email" },
        { label: "Password", name: "password", type: "password" },
        {
          label: "Confirm Password",
          name: "confirm_password",
          type: "password",
        },
        { label: "Phone", name: "phone", type: "tel", maxLength: 10 },
        { label: "City", name: "city", type: "text" },
        { label: "Photo URL", name: "photo_url", type: "url" },
        {
          label: "Role",
          name: "role",
          type: "text",
          disabled: userRole === "admin" ? false : true,
        }, // users can't change role
      ].map(({ label, name, type, disabled = false, maxLength = undefined }) =>
        // if label is Role
        label === "Role" ? (
          <div key={name}>
            <label
              htmlFor={name}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {label}
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              disabled={userRole !== "admin"}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="admin">admin</option>
              <option value="user">user</option>
            </select>
          </div>
        ) : (
          // otherwise
          <div key={name}>
            <label
              htmlFor={name}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {label}
            </label>
            <input
              type={type}
              id={name}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              disabled={disabled}
              maxLength={maxLength}
              placeholder={`Enter ${label.toLowerCase()}`}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )
      )}

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-md shadow"
        >
          Save
        </button>
      </div>
    </form>
  );
}
