"use client";

import { useState } from "react";
import API from "@/lib/api";
import { useAuth } from "./useAuth";

export function useWatchlist() {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function add(productId: string) {
    setLoading(true);
    setError(null);
    try {
      const res = await API.post(
        "/api/watchlist",
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (err: any) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  }

  async function remove(productId: string) {
    setLoading(true);
    setError(null);
    try {
      const res = await API.delete(
        "/api/watchlist",
        {
          headers: { Authorization: `Bearer ${token}` },
          data: { productId },
        }
      );
      return res.data;
    } catch (err: any) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  }

  return { add, remove, loading, error };
}
