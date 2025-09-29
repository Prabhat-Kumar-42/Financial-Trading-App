"use client";

import { useParams } from "next/navigation";
import { useProduct } from "@/hooks/useProduct";
import { useState } from "react";
import { useTransactions } from "@/hooks/useTransactions";
import { useWatchlistContext } from "@/contexts/WatchlistContext";
import toast from "react-hot-toast";
import { Skeleton, SkeletonChart, SkeletonText } from "@/components/Skeleton";
import Modal from "@/components/Modal";

import { ProductInfoCard } from "./components/ProductInfoCard";
import { PriceTrendCard } from "./components/PriceTrendCard";
import { BuySectionCard } from "./components/BuySectionCard";

export default function ProductDetailPage() {
  const { id } = useParams();
  const { product, loading, error } = useProduct(id!);
  const { buyProduct, loading: buying, error: buyError } = useTransactions();
  const [units, setUnits] = useState(1);
  const [showBuyModal, setShowBuyModal] = useState(false);

  const {
    add,
    remove,
    loading: watchlistLoading,
    error: watchlistError,
    watchlist,
  } = useWatchlistContext();

  const [removeId, setRemoveId] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        <SkeletonText width="50%" height={32} />
        <SkeletonText width="30%" />
        <SkeletonText width="20%" />
        <Skeleton className="h-10 w-32" />
        <SkeletonChart />
        <SkeletonText width="25%" height={24} />
        <Skeleton className="h-10 w-32" />
      </div>
    );
  }

  if (error) return <div className="text-red-500 text-center p-6">Error: {error}</div>;
  if (!product) return <div className="text-center p-6">Product not found</div>;

  const isInWatchlist = watchlist.some((w) => w.product.id === product.id);

  const handleBuy = () => {
    if (units < 1) return toast.error("Units must be at least 1");
    setShowBuyModal(true);
  };

  const confirmBuy = async () => {
    setShowBuyModal(false);
    await buyProduct(product.id, units);
  };

  const confirmRemoveWatchlist = () => {
    if (!removeId) return;
    remove(removeId);
    setRemoveId(null);
  };

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      <ProductInfoCard
        product={product}
        isInWatchlist={isInWatchlist}
        add={add}
        setRemoveId={setRemoveId}
        watchlistLoading={watchlistLoading}
        watchlistError={watchlistError}
      />

      <PriceTrendCard basePrice={product.pricePerUnit} />

      <BuySectionCard
        units={units}
        setUnits={setUnits}
        handleBuy={handleBuy}
        buying={buying}
        pricePerUnit={product.pricePerUnit}
      />

      <Modal
        isOpen={showBuyModal}
        title="Confirm Purchase"
        message={`Are you sure you want to buy ${units} units of ${product.name} for ₹${units * product.pricePerUnit}?`}
        onConfirm={confirmBuy}
        onCancel={() => setShowBuyModal(false)}
        confirmText="Buy"
        cancelText="Cancel"
      />

      <Modal
        isOpen={!!removeId}
        title="Remove from Watchlist"
        message="Are you sure you want to remove this product from your watchlist?" 
        onConfirm={confirmRemoveWatchlist}
        onCancel={() => setRemoveId(null)}
        confirmText="Remove"
        cancelText="Cancel"
      />

      {buyError && <p className="text-red-500">{buyError}</p>}
    </div>
  );
}
