"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchProfile, updateProfile } from "../../../lib/auth";
import UserForm from "../../../components/UserForm";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchProfile()
      .then(setUser)
      .catch(() => router.push("/login"));
  }, [router]);

  if (!user) return <p className="p-6">Loading...</p>;

  const onSave = async (data) => {
    try {
      await updateProfile(data);
      alert("Profile updated");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl mb-4">Edit Profile</h1>
      <UserForm initialData={user} onSubmit={onSave} isUser={true} />
    </div>
  );
}
