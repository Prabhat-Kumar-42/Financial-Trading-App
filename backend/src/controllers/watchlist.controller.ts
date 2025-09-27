import type { Request, Response } from "express";
import type { AuthRequest } from "@/types/auth-request.type.js";
import { watchlistService } from "@/services/watchlist.service.js";

// /src/controllers/watchlist.controller.ts
export async function add(req: AuthRequest, res: Response) {
  try {
    const userId = req.user.id;
    const { productId } = req.body;
    const watchlist = await watchlistService.addToWatchlist(userId, productId);
    res.status(201).json(watchlist);
  } catch (err: any) {
    res.status(err.status || 500).json({ error: err.message });
  }
}

export async function remove(req: AuthRequest, res: Response) {
  try {
    const userId = req.user.id;
    const { productId } = req.body;
    await watchlistService.removeFromWatchlist(userId, productId);
    res.status(200).json({ message: "Removed from watchlist" });
  } catch (err: any) {
    res.status(err.status || 500).json({ error: err.message });
  }
}
