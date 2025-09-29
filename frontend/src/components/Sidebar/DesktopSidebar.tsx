"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Skeleton } from "@/components/Skeleton";

const navItems = [
  { name: "Products", href: "/products" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Watchlist", href: "/watchlist" },
  { name: "Profile", href: "/profile" },
];

export default function DesktopSidebar() {
  const pathname = usePathname() || "/";
  const { user, logout } = useAuth();

  return (
    <aside className="hidden md:flex md:flex-col md:w-64 md:flex-shrink-0 bg-white border-r shadow-lg">
      <div className="px-6 py-6 border-b">
        <div className="text-2xl font-bold">Financial App</div>
        <div className="mt-2 text-sm text-gray-600">
          Wallet:{" "}
          {user ? (
            <span className="font-semibold">₹{(user.walletBalance ?? 0).toFixed(2)}</span>
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
              pathname.startsWith(item.href) ? "bg-gray-100 font-semibold" : "hover:bg-gray-50"
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
  );
}
