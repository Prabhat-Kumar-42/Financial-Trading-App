"use client";
import Link from "next/link";
import { useWatchlistContext } from "@/contexts/WatchlistContext";

// /src/app/(protected)/watchlist/page.tsx
export default function WatchlistPage() {
  const { watchlist, loading, error, remove } = useWatchlistContext();

  if (loading) return <div>Loading watchlist...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  if (!watchlist.length) {
    return <div className="p-6">Your watchlist is empty. Browse <Link href="/products">products</Link>.</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Watchlist</h1>
      <ul className="space-y-3">
        {watchlist.map((w) => (
          <li key={w.id} className="flex items-center justify-between border rounded p-3">
            <div>
              <Link href={`/products/${w.product.id}`} className="font-semibold text-lg">
                {w.product.name}
              </Link>
              <div className="text-sm text-gray-600">₹{w.product.pricePerUnit}</div>
            </div>

            <div className="flex items-center gap-2">
              <Link href={`/products/${w.product.id}`} className="px-3 py-1 border rounded">View</Link>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => remove(w.product.id)}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
