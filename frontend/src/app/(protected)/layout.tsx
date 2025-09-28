"use client";

import { ReactNode, useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { WatchlistProvider } from "@/contexts/WatchlistContext";
import { useSession } from "@/hooks/useSession";

// /src/app/(protected)/layout.tsx
export default function ProtectedLayout({ children }: { children: ReactNode }) {
  const { loading, isAuthenticated } = useSession();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) return null; // redirect handled in useSession

  return (
    <WatchlistProvider>
      <div className="min-h-screen flex bg-gray-50">
        <Sidebar children={null} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </WatchlistProvider>
  );
}