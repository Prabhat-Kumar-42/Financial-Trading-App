"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Skeleton } from "./Skeleton";

// /src/components/Sidebar.tsx
const navItems = [
  { name: "Products", href: "/products" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Watchlist", href: "/watchlist" },
  { name: "Profile", href: "/profile" },
];

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "/";
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [showWallet, setShowWallet] = useState(true);

  const walletBarHeight = 56; // Height in px

  // Scroll handler for mobile wallet bar
  useEffect(() => {
    let lastScroll = 0;

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScroll && currentScroll > walletBarHeight) {
        setShowWallet(false);
      } else {
        setShowWallet(true);
      }
      lastScroll = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex min-h-screen overflow-x-hidden">
      {/* ===== MOBILE WALLET BAR ===== */}
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
              <span className="font-semibold">
                ₹{(user.walletBalance ?? 0).toFixed(2)}
              </span>
            ) : (
              <Skeleton className="h-4 w-20 inline-block" />
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOpen((s) => !s)}
            aria-label="Toggle menu"
            className="p-2 rounded hover:bg-gray-700 transition"
          >
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                d="M3 6h14M3 10h14M3 14h14"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
              />
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

      {/* ===== MOBILE SIDEBAR ===== */}
      <div
        className={`md:hidden fixed left-0 bottom-0 w-64 bg-white border-r shadow-lg z-30 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          top: `${walletBarHeight}px`,
          height: `calc(100vh - ${walletBarHeight}px)`,
        }}
      >
        <nav className="flex flex-col p-4 gap-2 overflow-y-auto h-full">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`p-3 rounded-md transition-colors ${
                pathname.startsWith(item.href)
                  ? "bg-gray-100 font-semibold"
                  : "hover:bg-gray-50"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* ===== DESKTOP SIDEBAR ===== */}
      <aside className="hidden md:flex md:flex-col md:w-64 md:flex-shrink-0 bg-white border-r shadow-lg">
        <div className="px-6 py-6 border-b">
          <div className="text-2xl font-bold">Financial App</div>
          <div className="mt-2 text-sm text-gray-600">
            Wallet:{" "}
            {user ? (
              <span className="font-semibold">
                ₹{(user.walletBalance ?? 0).toFixed(2)}
              </span>
            ) : (
              <Skeleton className="h-4 w-20 inline-block" />
            )}
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-4 py-2 rounded-md transition-colors ${
                pathname.startsWith(item.href)
                  ? "bg-gray-100 font-semibold"
                  : "hover:bg-gray-50"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t">
          <button
            onClick={() => logout()}
            className="w-full bg-red-600 text-white px-3 py-2 rounded hover:bg-red-500 transition"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* ===== PAGE CONTENT ===== */}
      <main className="flex-1 min-h-screen bg-gray-50" style={{ paddingTop: `${walletBarHeight}px` }}>
        {children}
      </main>
    </div>
  );
}
