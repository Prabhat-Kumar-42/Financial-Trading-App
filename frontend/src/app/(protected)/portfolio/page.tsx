"use client";

import { useState } from "react";
import { useWatchlistContext } from "@/contexts/WatchlistContext";
import { useAuth } from "@/hooks/useAuth";
import { usePortfolio } from "@/hooks/usePortfolio";
import { PortfolioSkeleton } from "./components/PortfolioSkeleton";
import { TransactionsCard } from "./components/PortfolioTransactionCard";
import { WatchlistCard } from "./components/WatchlistCard";
import { ConfirmRemoveModal } from "./components/ConfirmRemoveModal";
import { SummaryCard } from "./components/PortfolioSummaryCard";

export default function PortfolioPage() {
  const { portfolio, loading, error } = usePortfolio();
  const { user } = useAuth();
  const { watchlist, remove } = useWatchlistContext();

  const [removeId, setRemoveId] = useState<string | null>(null);
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

  if (loading) return <PortfolioSkeleton />;
  if (error) return <div className="text-red-500 text-center p-6">Error: {error}</div>;
  if (!portfolio) return <div className="text-center p-6">No portfolio data</div>;

  const hasTransactions = portfolio.transactions.length > 0;

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800">Portfolio</h1>

      <SummaryCard
        walletBalance={user?.walletBalance ?? 0}
        totalInvested={portfolio.totalInvested}
        currentValue={portfolio.currentValue}
        returns={portfolio.returns}
        hasTransactions={hasTransactions}
      />

      <TransactionsCard transactions={portfolio.transactions} />

      <WatchlistCard
        watchlist={watchlist}
        onRemove={handleRemove}
        loadingItemId={loadingItemId}
      />

      <ConfirmRemoveModal
        isOpen={!!removeId}
        onConfirm={confirmRemove}
        onCancel={() => setRemoveId(null)}
      />
    </div>
  );
}
