"use client";

import { useState } from "react";
import API from "@/lib/api";
import { useAuth } from "./useAuth";

// /src/hooks/useTransactions.ts
export function useTransactions() {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function buyProduct(productId: string, units: number) {
    setLoading(true);
    setError(null);
    try {
      const res = await API.post(
        `/api/transactions`,
        { productId, units },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (err: any) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  }

  return { buyProduct, loading, error };
}
