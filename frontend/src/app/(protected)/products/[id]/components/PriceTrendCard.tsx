"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface PriceTrendCardProps {
  basePrice: number;
}

export function PriceTrendCard({ basePrice }: PriceTrendCardProps) {
  const chartData = Array.from({ length: 10 }).map((_, index) => ({
    time: `Day ${index + 1}`,
    value: basePrice + Math.random() * 100 - 50,
  }));

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Price Trend</h2>
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
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
  );
}
