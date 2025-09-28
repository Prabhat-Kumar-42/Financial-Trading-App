import { userService } from "@/services/user.service.js";
import type { AuthRequest } from "@/types/auth-request.type.js";
import { type Response } from "express";

export async function getMe(req: AuthRequest, res: Response) {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const profile = await userService.getUserProfile(userId);
  return res.json(profile);
}
