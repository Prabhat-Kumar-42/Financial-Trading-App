"use client";

import { useState, useEffect, useCallback } from "react";
import API from "@/lib/api";
import { useAuth } from "./useAuth";

// /src/hooks/usePortfolio.ts
export type Portfolio = {
  transactions: {
    id: string;
    product: {
      id: string;
      name: string;
      pricePerUnit: number;
    };
    units: number;
    amount: number;
  }[];
  watchlist: {
    id: string;
    product: {
      id: string;
      name: string;
      pricePerUnit: number;
    };
  }[];
  totalInvested: number;
  currentValue: number;
  returns: number;
};

export function usePortfolio() {
  const { token } = useAuth();
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPortfolio = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await API.get("/portfolio", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const payload = res.data?.data ?? res.data;
      setPortfolio(payload);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (!token) return;
    fetchPortfolio();

    const handler = () => {
      fetchPortfolio();
    };
    window.addEventListener("portfolio-updated", handler);
    return () => window.removeEventListener("portfolio-updated", handler);
  }, [token, fetchPortfolio]);

  return { portfolio, loading, error };
}
