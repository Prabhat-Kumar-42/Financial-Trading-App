"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import API from "@/lib/api";
import { SkeletonCard } from "@/components/Skeleton";
import ProfileCard from "./components/ProfileCard";

type UserProfile = {
  id: string;
  name: string;
  email: string;
  pan: string;
  walletBalance: number;
  kycImageUrl: string;
  createdAt: string;
};

export default function ProfilePage() {
  const { token } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    API.get("/users/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => setProfile(res.data))
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) {
    return (
      <div className="p-6 space-y-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900">
          My Profile
        </h1>
        <SkeletonCard />
      </div>
    );
  }

  if (!profile) {
    return (
      <p className="p-6 text-center text-red-500">Failed to load profile</p>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-center text-gray-900">
        My Profile
      </h1>
      <div className="flex justify-center">
        <ProfileCard profile={profile} />
      </div>
    </div>
  );
}
