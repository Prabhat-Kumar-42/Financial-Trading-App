"use client";

import { useState } from "react";
import Link from "next/link";
import { useWatchlistContext } from "@/contexts/WatchlistContext";
import { SkeletonListItem } from "@/components/Skeleton";
import Modal from "@/components/Modal";
import { EmptyState } from "@/components/EmptyState";
import WatchlistHeader from "./components/WatchlistHeader";
import WatchlistItem from "./components/WatchlistItem";

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

  if (error) {
    return (
      <div className="text-red-500 text-center p-6">Error: {error}</div>
    );
  }

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
      <WatchlistHeader setShowRemoveAll={setShowRemoveAll} />

      <ul className="space-y-3">
        {watchlist.map((w) => (
          <WatchlistItem
            key={w.id}
            product={w.product}
            handleRemove={handleRemove}
            loadingItemId={loadingItemId}
          />
        ))}
      </ul>

      {/* Confirmation Modals */}
      <Modal
        isOpen={!!removeId}
        title="Remove from Watchlist"
        message="Are you sure you want to remove this product from your watchlist?"
        onConfirm={confirmRemove}
        onCancel={() => setRemoveId(null)}
        confirmText="Remove"
        cancelText="Cancel"
      />

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
