"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { SkeletonCard } from "@/components/Skeleton";
import API from "@/lib/api";
import { Card } from "@/components/Card";

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
      <p className="p-6 text-center text-red-500">
        Failed to load profile
      </p>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-center text-gray-900">
        My Profile
      </h1>
      <div className="flex justify-center">
      {/* Profile Card */}
      <Card className="flex flex-col md:flex-row items-start gap-6 p-6 bg-white shadow-lg rounded-lg">
        {/* KYC Document */}
        <div className="flex-shrink-0 flex flex-col items-center text-center">
          <h2 className="text-lg font-semibold mb-2">KYC Document</h2>
          <img
            src={profile.kycImageUrl}
            alt="KYC Document"
            className="w-48 h-48 object-cover rounded-lg border border-gray-300 shadow-sm"
          />
          <a
            href={profile.kycImageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 text-blue-600 hover:underline text-sm"
          >
            View / Download
          </a>
        </div>

        {/* User Info */}
        <div className="flex-1 space-y-4">
          <p className="text-lg">
            <span className="font-semibold">Name:</span> {profile.name}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Email:</span> {profile.email}
          </p>
          <p className="text-lg">
            <span className="font-semibold">PAN:</span> {profile.pan}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Wallet Balance:</span>{" "}
            <span className="text-green-600 font-medium">
              ₹{profile.walletBalance.toLocaleString()}
            </span>
          </p>
          <p className="text-lg">
            <span className="font-semibold">Joined:</span>{" "}
            {new Date(profile.createdAt).toLocaleDateString()}
          </p>
        </div>
      </Card>
      </div>
    </div>
  );
}
