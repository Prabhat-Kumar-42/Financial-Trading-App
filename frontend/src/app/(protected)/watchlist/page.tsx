"use client";
import Link from "next/link";
import { useWatchlistContext } from "@/contexts/WatchlistContext";
import { SkeletonListItem } from "@/components/Skeleton";
import { useState } from "react";
import Modal from "@/components/Modal";

// /src/app/(protected)/watchlist/page.tsx
export default function WatchlistPage() {
  const { watchlist, loading, error, remove } = useWatchlistContext();
  const [removeId, setRemoveId] = useState<string | null>(null);
  const [showRemoveAll, setShowRemoveAll] = useState(false);

  const confirmRemove = () => {
    if (!removeId) return;
    remove(removeId);
    setRemoveId(null);
  };

  const confirmRemoveAll = () => {
    watchlist.forEach((w) => remove(w.product.id));
    setShowRemoveAll(false);
  };

  if (loading) {
    return (
      <div className="p-6 space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonListItem key={i} />
        ))}
      </div>
    );
  }
  if (error) return <div className="text-red-500">Error: {error}</div>;

  if (!watchlist.length) {
    return (
      <div className="p-6">
        Your watchlist is empty. Browse <Link href="/products">products</Link>.
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Watchlist</h1>
        <button
          onClick={() => setShowRemoveAll(true)}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Remove All
        </button>
      </div>
      <ul className="space-y-3">
        {watchlist.map((w) => (
          <li
            key={w.id}
            className="flex items-center justify-between border rounded p-3"
          >
            <div>
              <Link
                href={`/products/${w.product.id}`}
                className="font-semibold text-lg"
              >
                {w.product.name}
              </Link>
              <div className="text-sm text-gray-600">
                ₹{w.product.pricePerUnit}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href={`/products/${w.product.id}`}
                className="px-3 py-1 border rounded"
              >
                View
              </Link>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => setRemoveId(w.product.id)}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      {/* Confirmation Modal */}
      <Modal
        isOpen={!!removeId}
        title="Remove from Watchlist"
        message="Are you sure you want to remove this product from your watchlist?"
        onConfirm={confirmRemove}
        onCancel={() => setRemoveId(null)}
        confirmText="Remove"
        cancelText="Cancel"
      />

      {/* Remove all modal */}
      <Modal
        isOpen={showRemoveAll}
        title="Clear Watchlist"
        message="Are you sure you want to remove all products from your watchlist?"
        onConfirm={confirmRemoveAll}
        onCancel={() => setShowRemoveAll(false)}
        confirmText="Remove All"
        cancelText="Cancel"
      />
    </div>
  );
}
