"use client";
import { EmptyState } from "@/components/EmptyState";
import Link from "next/link";

type WatchlistItem = {
  id: string;
  product: { id: string; name: string; pricePerUnit: number };
};

type Props = {
  watchlist: WatchlistItem[];
  onRemove: (productId: string) => void;
  loadingItemId: string | null;
};

export function WatchlistCard({ watchlist, onRemove, loadingItemId }: Props) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Watchlist</h2>

      {watchlist.length === 0 ? (
        <EmptyState
          title="Watchlist is Empty"
          message="Start by adding products to your watchlist."
          actionLabel="Browse Products"
          actionHref="/products"
        />
      ) : (
        <ul className="space-y-3">
          {watchlist.slice(0, 3).map((w) => (
            <li
              key={w.id}
              className="flex justify-between items-center border rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer bg-gray-50"
            >
              <Link
                href={`/products/${w.product.id}`}
                className="flex-1 text-left text-gray-800 font-medium hover:text-blue-600"
              >
                {w.product.name} — ₹{w.product.pricePerUnit}
              </Link>
              <button
                className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(w.product.id);
                }}
                disabled={loadingItemId === w.product.id}
              >
                {loadingItemId === w.product.id ? "Removing..." : "Remove"}
              </button>
            </li>
          ))}
          {watchlist.length > 3 && (
            <Link href="/watchlist" className="inline-block mt-2 text-blue-600 font-medium hover:underline">
              See all
            </Link>
          )}
        </ul>
      )}
    </div>
  );
}
