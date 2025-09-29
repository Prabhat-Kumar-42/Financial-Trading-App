"use client";

import { type UserProfile } from "./ProfileCard";

interface UserInfoProps {
  profile: UserProfile;
}

export default function UserInfo({ profile }: UserInfoProps) {
  return (
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
  );
}
