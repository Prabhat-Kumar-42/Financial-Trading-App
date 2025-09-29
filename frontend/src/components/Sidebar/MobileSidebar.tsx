"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Products", href: "/products" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Watchlist", href: "/watchlist" },
  { name: "Profile", href: "/profile" },
];

interface MobileSidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  walletBarHeight: number;
}

export default function MobileSidebar({ open, setOpen, walletBarHeight }: MobileSidebarProps) {
  const pathname = usePathname() || "/";

  return (
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
              pathname.startsWith(item.href) ? "bg-gray-100 font-semibold" : "hover:bg-gray-50"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
