"use client";

import { EmptyState } from "@/components/EmptyState";
import { SkeletonCard } from "@/components/Skeleton";
import { useProducts } from "@/hooks/useProducts";
import Link from "next/link";

// /src/app/(protected)/products/page.tsx
export default function ProductsPage() {
  const { products, loading, error } = useProducts();

  if (loading) {
    return (
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      {products.length === 0 ? (
        <EmptyState
          title="No Products Available"
          message="Please check back later for new investment opportunities."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="border rounded p-4 shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p>Category: {product.category}</p>
              <p>Price: ₹{product.pricePerUnit}</p>
              <p>{product.metric}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
