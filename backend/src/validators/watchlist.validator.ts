import { z } from "zod";

// /src/validators/watchlist.validator.ts
export const watchlistSchema = z.object({
  productId: z.string().uuid("Invalid product ID"),
});

export type WatchlistDTO = z.infer<typeof watchlistSchema>;