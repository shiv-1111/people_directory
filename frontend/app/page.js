"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchProfile } from "../lib/auth";

export default function HomePage() {
  const router = useRouter();
  useEffect(() => {
    fetchProfile()
      .then(() => router.push("/dashboard"))
      .catch(() => router.push("/login"));
  }, [router]);
  return <p>Redirecting...</p>;
}
