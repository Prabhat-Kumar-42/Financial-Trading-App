"use client";

import { EmptyState } from "@/components/EmptyState";
import { SkeletonCard } from "@/components/Skeleton";
import { useProducts } from "@/hooks/useProducts";
import Link from "next/link";

export default function ProductsPage() {
  const { products, loading, error } = useProducts();

  if (loading) {
    return (
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (error)
    return <div className="text-red-500 text-center p-6">Error: {error}</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Products</h1>

      {products.length === 0 ? (
        <EmptyState
          title="No Products Available"
          message="Please check back later for new investment opportunities."
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow hover:shadow-lg hover:scale-105 transition-transform duration-200 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
                <p className="text-gray-600">Category: {product.category}</p>
                <p className="text-gray-600">
                  Price: <span className="font-semibold">₹{product.pricePerUnit}</span>
                </p>
                <p className="text-gray-500">{product.metric}</p>
              </div>
              <div className="mt-4">
                <span className="text-blue-600 font-medium hover:underline">
                  View Details
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
