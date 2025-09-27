"use client";

import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";

// /src/hooks/useProducts.ts

export type Product = {
  id: string;
  name: string;
  category: string;
  pricePerUnit: number;
  metric: string;
};

export function useProducts() {
  const { token } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;

    async function fetchProducts() {
      try {
        const res = await fetch("/api/products", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch products");
        const data: Product[] = await res.json();
        setProducts(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [token]);

  return { products, loading, error };
}
