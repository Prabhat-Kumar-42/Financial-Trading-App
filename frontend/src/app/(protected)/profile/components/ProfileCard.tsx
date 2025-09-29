"use client";

import { Card } from "@/components/Card";
import KycDocument from "./KycDocument";
import UserInfo from "./UserInfo";

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  pan: string;
  walletBalance: number;
  kycImageUrl: string;
  createdAt: string;
};

interface ProfileCardProps {
  profile: UserProfile;
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <Card className="flex flex-col md:flex-row items-start gap-6 p-6 bg-white shadow-lg rounded-lg">
      <KycDocument kycImageUrl={profile.kycImageUrl} />
      <UserInfo profile={profile} />
    </Card>
  );
}
