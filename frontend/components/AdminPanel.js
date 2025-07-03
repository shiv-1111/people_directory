"use client";
export default function AdminPanel({ user }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-bold">Admin Panel</h2>
      <p className="mt-2">
        Hello <strong>{user.name}</strong>, manage all users from the dashboard.
      </p>
    </div>
  );
}
