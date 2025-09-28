"use client";

import { Skeleton, SkeletonListItem, SkeletonRow, SkeletonText } from "@/components/Skeleton";
import { useWatchlistContext } from "@/contexts/WatchlistContext";
import { useAuth } from "@/hooks/useAuth";
import { usePortfolio } from "@/hooks/usePortfolio";
import Link from "next/link";

// /src/app/(protected)/portfolio/page.tsx
export default function PortfolioPage() {
  const { portfolio, loading, error } = usePortfolio();
  const { user } = useAuth();
  const {
    watchlist,
    add,
    remove,
    loading: watchlistLoading,
  } = useWatchlistContext();

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold mb-4">
          <Skeleton className="h-8 w-1/4" />
        </h1>

        {/* Summary */}
        <div className="space-y-2">
          <SkeletonText width="40%" />
          <SkeletonText width="60%" />
          <SkeletonText width="50%" />
          <SkeletonText width="70%" />
        </div>

        {/* Transactions */}
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <SkeletonRow key={i} />
          ))}
        </div>

        {/* Watchlist */}
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <SkeletonListItem key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!portfolio) return <div>No portfolio data</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Portfolio</h1>

      <div className="mb-6">
        <h2 className="text-lg font-semibold">Summary</h2>
        <p>
          Wallet Balance:{" "}
          <span className="font-semibold">
            ₹{(user?.walletBalance ?? 0).toFixed(2)}
          </span>
        </p>
        <p>Total Invested: ₹{portfolio.totalInvested.toFixed(2)}</p>
        <p>Current Value: ₹{portfolio.currentValue.toFixed(2)}</p>
        <p>
          Returns:{" "}
          <span
            className={
              portfolio.returns >= 0 ? "text-green-600" : "text-red-600"
            }
          >
            ₹{portfolio.returns.toFixed(2)}
          </span>
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold">Transactions</h2>
        {portfolio.transactions.length === 0 ? (
          <p>No transactions yet.</p>
        ) : (
          <table className="table-auto border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border px-4 py-2">Product</th>
                <th className="border px-4 py-2">Units</th>
                <th className="border px-4 py-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {portfolio.transactions.map((t) => (
                <tr key={t.id}>
                  <td className="border px-4 py-2">{t.product.name}</td>
                  <td className="border px-4 py-2">{t.units}</td>
                  <td className="border px-4 py-2">₹{t.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div>
        <h2 className="text-lg font-semibold">Watchlist</h2>
        {watchlist.length === 0 ? (
          <p>No products in watchlist.</p>
        ) : (
          <>
            <ul>
              {watchlist.slice(0, 3).map((w) => (
                <li
                  key={w.id}
                  className="mb-2 flex justify-between items-center"
                >
                  {w.product.name} — ₹{w.product.pricePerUnit}
                  <button
                    className="ml-4 text-red-500"
                    onClick={() => remove(w.product.id)}
                    disabled={watchlistLoading}
                  >
                    {watchlistLoading ? "Removing..." : "Remove"}
                  </button>
                </li>
              ))}
            </ul>
            {watchlist.length > 3 && <Link href="/watchlist">See all</Link>}
          </>
        )}
      </div>
    </div>
  );
}
