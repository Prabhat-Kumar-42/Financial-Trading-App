"use client";

import { useParams } from "next/navigation";
import { useProduct } from "@/hooks/useProduct";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// /src/app/(protected)/products/[id]/page.tsx
export default function ProductDetailPage() {
  const { id } = useParams();
  const { product, loading, error } = useProduct(id);

  if (loading) return <div>Loading product...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Product not found</div>;

  // Dummy chart data
  const chartData = Array.from({ length: 10 }).map((_, index) => ({
    time: `Day ${index + 1}`,
    value: product.pricePerUnit + Math.random() * 100 - 50,
  }));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
      <p className="mb-1">Category: {product.category}</p>
      <p className="mb-1">Price: ₹{product.pricePerUnit}</p>
      <p className="mb-6">{product.metric}</p>

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
    </div>
  );
}
