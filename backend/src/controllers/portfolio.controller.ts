import prisma from "@/db/prisma.js";
import type { AuthRequest } from "@/types/auth-request.type.js";
import type { Response } from "express";

// /src/controllers/portfolio.controller.ts
export async function getPortfolio(req: AuthRequest, res: Response) {
  if (!req.user) return res.status(401).json({ error: "Not authorized" });
  const userId = req.user.id;

  const transactions = await prisma.transaction.findMany({
    where: { userId },
    include: { product: true },
  });

  const watchlist = await prisma.watchlist.findMany({
    where: { userId },
    include: { product: true },
  });

  const totalInvested = transactions.reduce((sum, t) => sum + t.amount, 0);
  const currentValue = transactions.reduce(
    (sum, t) => sum + t.units * t.product.pricePerUnit,
    0
  );

  res.json({
    transactions,
    watchlist,
    totalInvested,
    currentValue,
    returns: currentValue - totalInvested,
  });
}
