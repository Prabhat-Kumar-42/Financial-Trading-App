"use client";
import { useWatchlistContext } from "@/contexts/WatchlistContext";

// /src/hooks/useWatchList.ts
export function useWatchlist() {
  const { add, remove, loading } = useWatchlistContext();
  return { add, remove, loading };
}
