"use client";

interface ProductInfoCardProps {
  product: {
    id: string;
    name: string;
    category: string;
    pricePerUnit: number;
    metric: string;
  };
  isInWatchlist: boolean;
  add: (productId: string) => Promise<void>;
  setRemoveId: (id: string | null) => void;
  watchlistLoading: boolean;
  watchlistError: string | null;
}

export function ProductInfoCard({
  product,
  isInWatchlist,
  add,
  setRemoveId,
  watchlistLoading,
  watchlistError,
}: ProductInfoCardProps) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 w-full">
      <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
      <p className="text-gray-600">
        Category: <span className="font-medium">{product.category}</span>
      </p>
      <p className="text-gray-600">
        Price: <span className="font-semibold">₹{product.pricePerUnit}</span>
      </p>
      <p className="text-gray-500">{product.metric}</p>

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
  );
}
