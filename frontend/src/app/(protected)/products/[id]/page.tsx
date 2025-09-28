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
      {/* Product Info Card */}
      <div className="bg-white shadow-lg rounded-lg p-8 w-full">
        <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
        <p className="text-gray-600">Category: <span className="font-medium">{product.category}</span></p>
        <p className="text-gray-600">Price: <span className="font-semibold">₹{product.pricePerUnit}</span></p>
        <p className="text-gray-500">{product.metric}</p>

        {/* Watchlist Button */}
        <div className="mt-4">
          {isInWatchlist ? (
            <button
              className="px-6 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition"
              onClick={() => setRemoveId(product.id)}
              disabled={watchlistLoading}
            >
              {watchlistLoading ? "Removing..." : "Remove from Watchlist"}
            </button>
          ) : (
            <button
              className="px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
              onClick={() => add(product.id)}
              disabled={watchlistLoading}
            >
              {watchlistLoading ? "Adding..." : "Add to Watchlist"}
            </button>
          )}
          {watchlistError && <p className="text-red-500 mt-2">{watchlistError}</p>}
        </div>
      </div>

      {/* Price Trend Chart Card */}
      <div className="bg-white rounded-lg shadow-lg p-6 w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Price Trend</h2>
        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={Array.from({ length: 10 }).map((_, index) => ({
                time: `Day ${index + 1}`,
                value: product.pricePerUnit + Math.random() * 100 - 50,
              }))}
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="time"
                tick={{ fill: "#6b7280", fontSize: 12 }}
                padding={{ left: 10, right: 10 }}
              />
              <YAxis
                tick={{ fill: "#6b7280", fontSize: 12 }}
                width={60}
                padding={{ top: 10, bottom: 10 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  borderRadius: 8,
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                  padding: "8px",
                }}
                labelStyle={{ fontWeight: "bold" }}
                formatter={(value) => [`₹${(value as number).toFixed(2)}`, "Price"]}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#4f46e5"
                strokeWidth={2}
                dot={{ r: 4, fill: "#4f46e5" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Buy Section Card */}
      <div className="bg-white rounded-lg shadow-lg p-6 w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Buy Product</h2>
        <div className="flex flex-wrap items-center gap-4">
          <input
            type="number"
            min="1"
            value={units}
            onChange={(e) => setUnits(Number(e.target.value))}
            className="border border-gray-300 p-2 rounded w-28 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleBuy}
            disabled={buying}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
          >
            {buying ? "Buying..." : `Buy for ₹${units * product.pricePerUnit}`}
          </button>
        </div>
      </div>

      {/* Confirmation Modals */}
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
