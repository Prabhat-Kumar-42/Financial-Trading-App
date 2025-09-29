"use client";

import Link from "next/link";

interface Product {
  id: string;
  name: string;
  pricePerUnit: number;
}

interface WatchlistItemProps {
  product: Product;
  handleRemove: (productId: string) => void;
  loadingItemId: string | null;
}

export default function WatchlistItem({
  product,
  handleRemove,
  loadingItemId,
}: WatchlistItemProps) {
  return (
    <li className="flex justify-between items-center border rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer bg-gray-50">
      <Link
        href={`/products/${product.id}`}
        className="flex-1 text-md font-medium text-gray-800 hover:text-blue-600"
      >
        {product.name}
        <div className="text-sm text-gray-500">₹{product.pricePerUnit}</div>
      </Link>

      <div className="flex items-center gap-2">
        <Link
          href={`/products/${product.id}`}
          className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 transition text-sm"
        >
          View
        </Link>
        <button
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm"
          onClick={(e) => {
            e.stopPropagation();
            handleRemove(product.id);
          }}
          disabled={loadingItemId === product.id}
        >
          {loadingItemId === product.id ? "Removing..." : "Remove"}
        </button>
      </div>
    </li>
  );
}
