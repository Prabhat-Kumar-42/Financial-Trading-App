import type { Request, Response } from "express";
import type { AuthRequest } from "@/types/auth-request.type.js";
import { watchlistService } from "@/services/watchlist.service.js";
import { watchlistSchema } from "@/validators/watchlist.validator.js";

// /src/controllers/watchlist.controller.ts

export async function add(req: AuthRequest, res: Response) {
  try {
    if (!req.user) return res.status(401).json({ error: "Not authorized" });
    const userId = req.user.id;
    const { productId } = watchlistSchema.parse(req.body);

    const watchlist = await watchlistService.addToWatchlist(userId, productId);
    res.status(201).json(watchlist);
  } catch (err: any) {
    if (err.name === "ZodError") {
      return res.status(400).json({ error: err.errors.map((e: any) => e.message) });
    }
    res.status(err.status || 500).json({ error: err.message });
  }
}

export async function remove(req: AuthRequest, res: Response) {
  try {
    if (!req.user) return res.status(401).json({ error: "Not authorized" });
    const userId = req.user.id;
    const { productId } = watchlistSchema.parse(req.body);

    await watchlistService.removeFromWatchlist(userId, productId);
    res.status(200).json({ message: "Removed from watchlist" });
  } catch (err: any) {
    if (err.name === "ZodError") {
      return res.status(400).json({ error: err.errors.map((e: any) => e.message) });
    }
    res.status(err.status || 500).json({ error: err.message });
  }
}

export async function list(req: AuthRequest, res: Response) {
  try {
    if (!req.user) return res.status(401).json({ error: "Not authorized" });
    const userId = req.user.id;
    const data = await watchlistService.getUserWatchlist(userId);
    res.json(data);
  } catch (err: any) {
    res.status(err.status || 500).json({ error: err.message });
  }
}

