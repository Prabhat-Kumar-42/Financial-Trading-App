"use client";
import { EmptyState } from "@/components/EmptyState";

type Props = {
  walletBalance: number;
  totalInvested: number;
  currentValue: number;
  returns: number;
  hasTransactions: boolean;
};

export function SummaryCard({ walletBalance, totalInvested, currentValue, returns, hasTransactions }: Props) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 space-y-3">
      <h2 className="text-2xl font-semibold text-gray-800">Summary</h2>
      <p>
        Wallet Balance:{" "}
        <span className="font-semibold">₹{walletBalance.toFixed(2)}</span>
      </p>

      {hasTransactions ? (
        <>
          <p>
            Total Invested:{" "}
            <span className="font-medium">₹{totalInvested.toFixed(2)}</span>
          </p>
          <p>
            Current Value:{" "}
            <span className="font-medium">₹{currentValue.toFixed(2)}</span>
          </p>
          <p>
            Returns:{" "}
            <span
              className={
                returns >= 0 ? "text-green-600 font-semibold" : "text-red-600 font-semibold"
              }
            >
              ₹{returns.toFixed(2)}
            </span>
          </p>
        </>
      ) : (
        <EmptyState
          title="No Investments Yet"
          message="Start by purchasing your first product."
          actionLabel="Browse Products"
          actionHref="/products"
        />
      )}
    </div>
  );
}
