"use client";

import { useParams } from "next/navigation";
import { useProduct } from "@/hooks/useProduct";
import { useState } from "react";
import { useTransactions } from "@/hooks/useTransactions";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useWatchlistContext } from "@/contexts/WatchlistContext";
import toast from "react-hot-toast";
import { Skeleton, SkeletonChart, SkeletonText } from "@/components/Skeleton";
import Modal from "@/components/Modal";

// /src/app/(protected)/products/[id]/page.tsx
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
      <div className="p-6 space-y-4">
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
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Product not found</div>;

  const isInWatchlist = watchlist.some((w) => w.product.id === product.id);

  const handleBuy = () => {
    if (units < 1) return toast.error("Units must be at least 1");
    setShowBuyModal(true);
  };

  const confirmBuy = async () => {
    setShowBuyModal(false);
    const result = await buyProduct(product.id, units);
    if (result) toast.success("Purchase successful!");
  };

  const confirmRemoveWatchlist = () => {
    if (!removeId) return;
    remove(removeId);
    setRemoveId(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
      <p className="mb-1">Category: {product.category}</p>
      <p className="mb-1">Price: ₹{product.pricePerUnit}</p>
      <p className="mb-6">{product.metric}</p>

      {/* Watchlist Button */}
      {isInWatchlist ? (
        <button
          className="px-4 py-2 rounded mb-4 bg-red-500 text-white"
          onClick={() => setRemoveId(product.id)}
          disabled={watchlistLoading}
        >
          {watchlistLoading ? "Removing..." : "Remove from Watchlist"}
        </button>
      ) : (
        <button
          className="px-4 py-2 rounded mb-4 bg-blue-600 text-white"
          onClick={() => add(product.id)}
          disabled={watchlistLoading}
        >
          {watchlistLoading ? "Adding..." : "Add to Watchlist"}
        </button>
      )}
      {watchlistError && <p className="text-red-500">{watchlistError}</p>}

      {/* Price Trend */}
      <h2 className="text-xl font-semibold mb-4">Price Trend</h2>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={Array.from({ length: 10 }).map((_, index) => ({
            time: `Day ${index + 1}`,
            value: product.pricePerUnit + Math.random() * 100 - 50,
          }))}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Buy Section */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold">Buy Product</h2>
        <input
          type="number"
          min="1"
          value={units}
          onChange={(e) => setUnits(Number(e.target.value))}
          className="border p-2 mr-2"
        />
        <button
          onClick={handleBuy}
          disabled={buying}
          className="bg-blue-500 text-white p-2 rounded"
        >
          {buying ? "Buying..." : `Buy for ₹${units * product.pricePerUnit}`}
        </button>
      </div>

      {/* Confirmation Modals */}
      <Modal
        isOpen={showBuyModal}
        title="Confirm Purchase"
        message={`Are you sure you want to buy ${units} units of ${product.name} for ₹${
          units * product.pricePerUnit
        }?`}
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
