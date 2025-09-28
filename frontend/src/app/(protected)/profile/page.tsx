"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Skeleton, SkeletonCard } from "@/components/Skeleton";
import { Card } from "@/components/Card";
import API from "@/lib/api";

// /src/app/(protected)/profile/page.tsx
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
      <div className="p-6 space-y-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold">User Profile</h1>
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }
  console.log(profile);
  if (!profile) {
    return <p className="p-6 text-red-500">Failed to load profile</p>;
  }

  return (
    <div className="p-6 space-y-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold">User Profile</h1>

      <Card className="space-y-3">
        <p><span className="font-semibold">Name:</span> {profile.name}</p>
        <p><span className="font-semibold">Email:</span> {profile.email}</p>
        <p><span className="font-semibold">PAN:</span> {profile.pan}</p>
        <p><span className="font-semibold">Wallet Balance:</span> ₹{profile.walletBalance.toLocaleString()}</p>
        <p><span className="font-semibold">Joined:</span> {new Date(profile.createdAt).toLocaleDateString()}</p>
      </Card>

      <Card>
        <p className="font-semibold mb-2">KYC Image</p>
        <img
          src={profile.kycImageUrl}
          alt="KYC Document"
          className="w-48 h-48 object-cover rounded-xl border"
        />
        <a
          href={profile.kycImageUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-2 text-blue-500 hover:underline text-sm"
        >
          View / Download
        </a>
      </Card>
    </div>
  );
}
