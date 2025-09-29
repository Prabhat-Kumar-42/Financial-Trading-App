"use client";

interface BuySectionCardProps {
  units: number;
  setUnits: (value: number) => void;
  handleBuy: () => void;
  buying: boolean;
  pricePerUnit: number;
}

export function BuySectionCard({
  units,
  setUnits,
  handleBuy,
  buying,
  pricePerUnit,
}: BuySectionCardProps) {
  return (
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
          {buying ? "Buying..." : `Buy for ₹${units * pricePerUnit}`}
        </button>
      </div>
    </div>
  );
}
