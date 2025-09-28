"use client";

import { useState } from "react";
import API from "@/lib/api";
import { useAuth } from "./useAuth";

// /src/hooks/useTransactions.ts

export function useTransactions() {
  const { token, updateWallet } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function buyProduct(productId: string, units: number) {
    setLoading(true);
    setError(null);
    try {
      const res = await API.post(
        `/transactions`,
        { productId, units },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const payload = res.data?.data ?? res.data;

      // If backend returned updatedBalance, update auth context
      if (payload?.updatedBalance !== undefined && updateWallet) {
        updateWallet(payload.updatedBalance);
      }

      // notify any listeners to refresh portfolio UI
      try {
        window.dispatchEvent(new Event("portfolio-updated"));
      } catch (e) {
        // ignore in non-browser env
      }

      return payload;
    } catch (err: any) {
      setError(err.response?.data?.error || err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { buyProduct, loading, error };
}
