"use client";
import { EmptyState } from "@/components/EmptyState";
import Link from "next/link";

type Transaction = {
  id: string;
  units: number;
  amount: number;
  product: { id: string; name: string };
};

type Props = { transactions: Transaction[] };

export function TransactionsCard({ transactions }: Props) {
  const hasTransactions = transactions.length > 0;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Transactions</h2>

      {hasTransactions ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-left rounded">
            <thead className="bg-gray-50">
              <tr>
                <th className="border px-4 py-2 text-sm font-medium text-gray-700">Product</th>
                <th className="border px-4 py-2 text-sm font-medium text-gray-700">Units</th>
                <th className="border px-4 py-2 text-sm font-medium text-gray-700">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t, index) => (
                <tr
                  key={t.id}
                  className={`transition-colors ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-blue-50`}
                >
                  <td className="border px-4 py-2">
                    <Link href={`/products/${t.product.id}`} className="text-blue-600 hover:underline">
                      {t.product.name}
                    </Link>
                  </td>
                  <td className="border px-4 py-2">{t.units}</td>
                  <td className="border px-4 py-2 font-semibold">₹{t.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState
          title="No Transactions Yet"
          message="Start by purchasing your first product."
          actionLabel="Browse Products"
          actionHref="/products"
        />
      )}
    </div>
  );
}
