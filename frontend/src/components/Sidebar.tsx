"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

// /src/components/Sidebar.tsx
const navItems = [
  { name: "Products", href: "/products" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Watchlist", href: "/watchlist" },
];

export default function Sidebar() {
  const pathname = usePathname() || "/";
  const { logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden bg-gray-800 text-white flex items-center justify-between px-4 py-3">
        <div className="text-lg font-semibold">Financial App</div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOpen((s) => !s)}
            aria-label="Toggle menu"
            className="p-2 rounded hover:bg-gray-700"
          >
            {/* simple hamburger */}
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
            </svg>
          </button>
          <button
            onClick={() => logout()}
            className="bg-red-600 px-3 py-1 rounded text-sm hover:bg-red-500"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Mobile slide-out */}
      {open && (
        <div className="md:hidden bg-white border-b shadow-sm">
          <nav className="flex flex-col p-4 gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`p-2 rounded ${pathname.startsWith(item.href) ? "bg-gray-100 font-semibold" : "hover:bg-gray-50"}`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:flex-col md:w-64 md:flex-shrink-0 bg-white border-r">
        <div className="px-6 py-6 border-b">
          <div className="text-xl font-bold">Financial App</div>
        </div>

        <nav className="p-4 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-3 py-2 rounded mb-1 ${
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
            className="w-full bg-red-600 text-white px-3 py-2 rounded hover:bg-red-500"
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
