import prisma from "@/db/prisma.js";
import { HttpError } from "@/utils/http-error.util.js";

// /src/services/watchlist.service.ts
export const watchlistService = {
  addToWatchlist: async function (userId: string, productId: string) {
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product) throw new HttpError(404, "Product not found");

    const existing = await prisma.watchlist.findFirst({
      where: { userId, productId },
    });
    if (existing) throw new HttpError(400, "Product already in watchlist");

    return prisma.watchlist.create({
      data: { userId, productId },
    });
  },

  removeFromWatchlist: async function (userId: string, productId: string) {
    const existing = await prisma.watchlist.findFirst({
      where: { userId, productId },
    });
    if (!existing) throw new HttpError(404, "Product not in watchlist");

    return prisma.watchlist.delete({ where: { id: existing.id } });
  },
};
