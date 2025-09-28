"use client";

import { EmptyState } from "@/components/EmptyState";
import Modal from "@/components/Modal";
import {
  Skeleton,
  SkeletonListItem,
  SkeletonRow,
  SkeletonText,
} from "@/components/Skeleton";
import { useWatchlistContext } from "@/contexts/WatchlistContext";
import { useAuth } from "@/hooks/useAuth";
import { usePortfolio } from "@/hooks/usePortfolio";
import Link from "next/link";
import { useState } from "react";

export default function PortfolioPage() {
  const { portfolio, loading, error } = usePortfolio();
  const { user } = useAuth();
  const {
    watchlist,
    add,
    remove,
    loading: watchlistLoading,
  } = useWatchlistContext();

  const [removeId, setRemoveId] = useState<string | null>(null);

  // For tracking loading state per watchlist item
  const [loadingItemId, setLoadingItemId] = useState<string | null>(null);

  const confirmRemove = () => {
    if (!removeId) return;
    remove(removeId);
    setRemoveId(null);
  };

  const handleRemove = async (productId: string) => {
    setLoadingItemId(productId);
    await remove(productId);
    setLoadingItemId(null);
  };

  if (loading) {
    return (
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">
          <Skeleton className="h-8 w-1/4" />
        </h1>

        {/* Summary Skeleton */}
        <div className="space-y-2 bg-white shadow rounded-lg p-6">
          <SkeletonText width="40%" />
          <SkeletonText width="60%" />
          <SkeletonText width="50%" />
          <SkeletonText width="70%" />
        </div>

        {/* Transactions Skeleton */}
        <div className="space-y-2 bg-white shadow rounded-lg p-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <SkeletonRow key={i} />
          ))}
        </div>

        {/* Watchlist Skeleton */}
        <div className="space-y-2 bg-white shadow rounded-lg p-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <SkeletonListItem key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error)
    return <div className="text-red-500 text-center p-6">Error: {error}</div>;
  if (!portfolio)
    return <div className="text-center p-6">No portfolio data</div>;

  const hasTransactions = portfolio.transactions.length > 0;

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800">Portfolio</h1>

      {/* Summary Card */}
      <div className="bg-white shadow-lg rounded-lg p-6 space-y-3">
        <h2 className="text-2xl font-semibold text-gray-800">Summary</h2>
        <p>
          Wallet Balance:{" "}
          <span className="font-semibold">
            ₹{(user?.walletBalance ?? 0).toFixed(2)}
          </span>
        </p>

        {hasTransactions ? (
          <>
            <p>
              Total Invested:{" "}
              <span className="font-medium">
                ₹{portfolio.totalInvested.toFixed(2)}
              </span>
            </p>
            <p>
              Current Value:{" "}
              <span className="font-medium">
                ₹{portfolio.currentValue.toFixed(2)}
              </span>
            </p>
            <p>
              Returns:{" "}
              <span
                className={
                  portfolio.returns >= 0
                    ? "text-green-600 font-semibold"
                    : "text-red-600 font-semibold"
                }
              >
                ₹{portfolio.returns.toFixed(2)}
              </span>
            </p>
          </>
        ) : (
          <EmptyState
            title="No Investments Yet"
            message="Start by purchasing your first product."
            actionLabel="Browse Products"
            actionHref="/products"
          />
        )}
      </div>

      {/* Transactions Card */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Transactions
        </h2>

        {hasTransactions ? (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 text-left rounded">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border px-4 py-2 text-sm font-medium text-gray-700">
                    Product
                  </th>
                  <th className="border px-4 py-2 text-sm font-medium text-gray-700">
                    Units
                  </th>
                  <th className="border px-4 py-2 text-sm font-medium text-gray-700">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {portfolio.transactions.map((t, index) => (
                  <tr
                    key={t.id}
                    className={`transition-colors ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-blue-50`}
                  >
                    <td className="border px-4 py-2">
                      <Link
                        href={`/products/${t.product.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        {t.product.name}
                      </Link>
                    </td>
                    <td className="border px-4 py-2">{t.units}</td>
                    <td className="border px-4 py-2 font-semibold">
                      ₹{t.amount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState
            title="No Transactions Yet"
            message="Start by purchasing your first product."
            actionLabel="Browse Products"
            actionHref="/products"
          />
        )}
      </div>

      {/* Watchlist Card */}
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
                    handleRemove(w.product.id);
                  }}
                  disabled={loadingItemId === w.product.id}
                >
                  {loadingItemId === w.product.id ? "Removing..." : "Remove"}
                </button>
              </li>
            ))}
            {watchlist.length > 3 && (
              <Link
                href="/watchlist"
                className="inline-block mt-2 text-blue-600 font-medium hover:underline"
              >
                See all
              </Link>
            )}
          </ul>
        )}
      </div>

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
    </div>
  );
}
