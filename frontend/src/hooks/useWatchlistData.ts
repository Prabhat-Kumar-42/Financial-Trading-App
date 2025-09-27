"use client";
import { useWatchlistContext } from "@/contexts/WatchlistContext";

// /src/hooks/useWatchlistData.ts
export function useWatchlistData() {
  const { watchlist, loading, error, refetch } = useWatchlistContext();
  return { watchlist, loading, error, refetch };
}

