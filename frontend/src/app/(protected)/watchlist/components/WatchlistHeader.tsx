"use client";

interface WatchlistHeaderProps {
  setShowRemoveAll: (value: boolean) => void;
}

export default function WatchlistHeader({ setShowRemoveAll }: WatchlistHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold text-gray-800">Watchlist</h1>
      <button
        onClick={() => setShowRemoveAll(true)}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
      >
        Remove All
      </button>
    </div>
  );
}
