"use client";

import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import API from "@/lib/api";

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

  const productId = Array.isArray(id) ? id[0] : id;

  useEffect(() => {
    if (!token || !productId) return;

    async function fetchProduct() {
      try {
        const res = await API.get<ProductDetail>(`/products/${productId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProduct(res.data);
      } catch (err: any) {
        setError(err.response?.data?.error || err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [productId, token]);

  return { product, loading, error };
}
