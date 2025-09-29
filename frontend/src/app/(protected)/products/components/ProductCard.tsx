import Link from "next/link";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    category: string;
    pricePerUnit: number;
    metric: string;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="bg-white border border-gray-200 rounded-lg p-6 shadow hover:shadow-lg hover:scale-105 transition-transform duration-200 flex flex-col justify-between"
    >
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
        <p className="text-gray-600">Category: {product.category}</p>
        <p className="text-gray-600">
          Price: <span className="font-semibold">₹{product.pricePerUnit}</span>
        </p>
        <p className="text-gray-500">{product.metric}</p>
      </div>
      <div className="mt-4">
        <span className="text-blue-600 font-medium hover:underline">
          View Details
        </span>
      </div>
    </Link>
  );
}
