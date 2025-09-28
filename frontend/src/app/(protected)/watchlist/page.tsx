"use client";

import Link from "next/link";
import { useWatchlistContext } from "@/contexts/WatchlistContext";
import { SkeletonListItem } from "@/components/Skeleton";
import { useState } from "react";
import Modal from "@/components/Modal";
import { EmptyState } from "@/components/EmptyState";

export default function WatchlistPage() {
  const { watchlist, loading, error, remove } = useWatchlistContext();
  const [removeId, setRemoveId] = useState<string | null>(null);
  const [showRemoveAll, setShowRemoveAll] = useState(false);
  const [loadingItemId, setLoadingItemId] = useState<string | null>(null);

  const confirmRemove = () => {
    if (!removeId) return;
    remove(removeId);
    setRemoveId(null);
  };

  const confirmRemoveAll = () => {
    watchlist.forEach((w) => remove(w.product.id));
    setShowRemoveAll(false);
  };

  const handleRemove = async (productId: string) => {
    setLoadingItemId(productId);
    await remove(productId);
    setLoadingItemId(null);
  };

  if (loading) {
    return (
      <div className="p-6 space-y-3 max-w-5xl mx-auto">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonListItem key={i} />
        ))}
      </div>
    );
  }

  if (error)
    return (
      <div className="text-red-500 text-center p-6">
        Error: {error}
      </div>
    );

  if (!watchlist.length) {
    return (
      <EmptyState
        title="Your Watchlist is Empty"
        message="Browse products and add them to your watchlist."
        actionLabel="Explore Products"
        actionHref="/products"
      />
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Watchlist</h1>
        <button
          onClick={() => setShowRemoveAll(true)}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Remove All
        </button>
      </div>

      {/* Watchlist Items */}
      <ul className="space-y-3">
        {watchlist.map((w) => (
          <li
            key={w.id}
            className="flex justify-between items-center border rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer bg-gray-50"
          >
            <Link
              href={`/products/${w.product.id}`}
              className="flex-1 text-md font-medium text-gray-800 hover:text-blue-600"
            >
              {w.product.name}
              <div className="text-sm text-gray-500">
                ₹{w.product.pricePerUnit}
              </div>
            </Link>

            <div className="flex items-center gap-2">
              <Link
                href={`/products/${w.product.id}`}
                className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 transition text-sm"
              >
                View
              </Link>
              <button
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(w.product.id);
                }}
                disabled={loadingItemId === w.product.id}
              >
                {loadingItemId === w.product.id ? "Removing..." : "Remove"}
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

      {/* Remove All Modal */}
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
