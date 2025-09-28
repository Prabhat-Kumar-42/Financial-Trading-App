import prisma from "@/db/prisma.js";

export const userService = {
  async getUserProfile(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) throw new Error("User not found");

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      pan: user.pan,
      walletBalance: user.walletBalance,
      kycImageUrl: user.kycDocPath || null, // Supabase/local URL
      createdAt: user.createdAt,
    };
  },
};
