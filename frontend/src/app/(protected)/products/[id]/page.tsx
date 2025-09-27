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
import { useWatchlist } from "@/hooks/useWatchlist";

// /src/app/(protected)/products/[id]/page.tsx
export default function ProductDetailPage() {
  const { id } = useParams();
  const { product, loading, error } = useProduct(id!);
  const { buyProduct, loading: buying, error: buyError } = useTransactions();
  const [units, setUnits] = useState(1);
  const {
    add,
    remove,
    loading: watchlistLoading,
    error: watchlistError,
  } = useWatchlist();

  if (loading) return <div>Loading product...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Product not found</div>;

  const chartData = Array.from({ length: 10 }).map((_, index) => ({
    time: `Day ${index + 1}`,
    value: product.pricePerUnit + Math.random() * 100 - 50,
  }));

  const handleBuy = async () => {
    if (units < 1) return alert("Units must be at least 1");
    const result = await buyProduct(product.id, units);
    if (result) alert("Purchase successful!");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
      <p className="mb-1">Category: {product.category}</p>
      <p className="mb-1">Price: ₹{product.pricePerUnit}</p>
      <p className="mb-6">{product.metric}</p>

      <button
        className="px-4 py-2 bg-blue-600 text-white rounded mb-4"
        onClick={() => add(product.id)}
        disabled={watchlistLoading}
      >
        {watchlistLoading ? "Adding..." : "Add to Watchlist"}
      </button>
      {watchlistError && <p className="text-red-500">{watchlistError}</p>}

      <h2 className="text-xl font-semibold mb-4">Price Trend</h2>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

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
        {buyError && <p className="text-red-500">{buyError}</p>}
      </div>
    </div>
  );
}
