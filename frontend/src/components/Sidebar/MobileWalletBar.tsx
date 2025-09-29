"use client";

import { useAuth } from "@/hooks/useAuth";
import { Skeleton } from "@/components/Skeleton";

interface MobileWalletBarProps {
  showWallet: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function MobileWalletBar({ showWallet, open, setOpen }: MobileWalletBarProps) {
  const { user, logout } = useAuth();
  const walletBarHeight = 56;

  return (
    <div
      className={`md:hidden fixed top-0 left-0 right-0 bg-gray-800 text-white flex items-center justify-between px-4 py-3 shadow-md z-20 transition-transform duration-300 ${
        showWallet ? "translate-y-0" : "-translate-y-full"
      }`}
      style={{ height: walletBarHeight }}
    >
      <div>
        <div className="text-lg font-bold tracking-wide">Financial App</div>
        <div className="text-sm opacity-90">
          Wallet:{" "}
          {user ? (
            <span className="font-semibold">₹{(user.walletBalance ?? 0).toFixed(2)}</span>
          ) : (
            <Skeleton className="h-4 w-20 inline-block" />
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          className="p-2 rounded hover:bg-gray-700 transition"
        >
          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
          </svg>
        </button>
        <button
          onClick={() => logout()}
          className="bg-red-600 px-3 py-1 rounded text-sm hover:bg-red-500 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
