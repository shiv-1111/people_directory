"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, registerUser } from "../../../../lib/auth";
import UserForm from "../../../../components/UserForm";

export default function NewUserPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        if (user?.role !== "admin") {
          router.push("/dashboard");
        } else {
          setCurrentUser(user);
        }
      })
      .catch(() => router.push("/dashboard"));
  }, []);

  const handleSubmit = async (data) => {
    try {
      if (data.password !== data.confirm_password) {
        throw new Error("Password do not match!");
      }
      const finalData = {
        ...data,
        confirm_password: undefined,
      };
      await registerUser(finalData);
      alert("User created successfully!");
      router.push("/dashboard/users");
    } catch (err) {
      alert(err);
    }
  };

  if (!currentUser) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">Add New User</h2>
        <p className="text-sm text-gray-500">
          Fill out the form to register a new user.
        </p>
      </div>

      <UserForm
        onSubmit={handleSubmit}
        initialData={{
          name: "",
          email: "",
          password: "",
          confirm_password: "",
          phone: "",
          city: "",
          age: "",
          dob: "",
          photo_url: "",
          role: "",
        }}
      />
    </div>
  );
}
