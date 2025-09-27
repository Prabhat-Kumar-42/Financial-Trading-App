"use client";

import { useState, useEffect } from "react";
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

  useEffect(() => {
    if (!token) return;

    async function fetchPortfolio() {
      setLoading(true);
      try {
        const res = await API.get("/portfolio", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPortfolio(res.data);
      } catch (err: any) {
        setError(err.response?.data?.error || err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPortfolio();
  }, [token]);

  return { portfolio, loading, error };
}
