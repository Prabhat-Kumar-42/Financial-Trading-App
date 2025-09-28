"use client";

import { useState } from "react";
import API from "@/lib/api";
import { useAuth } from "./useAuth";
import toast from "react-hot-toast";

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
      toast.success("Purchase successful!");
      return payload;
    } catch (err: any) {
      const message = err.response?.data?.error || err.message;
      // setError(message);
      toast.error(`Purchase failed: ${message}`);
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { buyProduct, loading, error };
}
