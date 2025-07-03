"use client";
export default function UserPanel({ user }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-bold">User Panel</h2>
      <p className="mt-2">
        Hello <strong>{user.name}</strong>. You can view and edit your own
        details.
      </p>
    </div>
  );
}
