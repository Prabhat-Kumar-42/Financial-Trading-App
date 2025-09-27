"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import API from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";

// /src/contexts/WatchlistContext.tsx
type WatchlistItem = {
  id: string;
  product: {
    id: string;
    name: string;
    pricePerUnit: number;
    category?: string;
    metric?: string;
  };
};

type WatchlistContextType = {
  watchlist: WatchlistItem[];
  loading: boolean;
  error: string | null;
  add: (productId: string) => Promise<void>;
  remove: (productId: string) => Promise<void>;
  refetch: () => Promise<void>;
};

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export function WatchlistProvider({ children }: { children: ReactNode }) {
  const { token } = useAuth();
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWatchlist = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await API.get("/api/watchlist", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWatchlist(res.data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  const add = async (productId: string) => {
    if (!token) return;
    setLoading(true);
    try {
      await API.post(
        "/api/watchlist",
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchWatchlist();
    } catch (err: any) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  const remove = async (productId: string) => {
    if (!token) return;
    setLoading(true);
    try {
      await API.delete(
        "/api/watchlist",
        {
          headers: { Authorization: `Bearer ${token}` },
          data: { productId },
        }
      );
      await fetchWatchlist();
    } catch (err: any) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchWatchlist();
  }, [token]);

  return (
    <WatchlistContext.Provider value={{ watchlist, loading, error, add, remove, refetch: fetchWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
}

export const useWatchlistContext = () => {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error("useWatchlistContext must be used within a WatchlistProvider");
  }
  return context;
};
