"use client";

import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";

// /src/hooks/useProduct.ts
export type ProductDetail = {
  id: string;
  name: string;
  category: string;
  pricePerUnit: number;
  metric: string;
};
export function useProduct(id: string | string[] | undefined) {
  const { token } = useAuth();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const productId = Array.isArray(id) ? id[0] : id; // safe conversion

  useEffect(() => {
    if (!token || !productId) return;

    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products/${productId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch product");
        const data: ProductDetail = await res.json();
        setProduct(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [productId, token]);

  return { product, loading, error };
}
