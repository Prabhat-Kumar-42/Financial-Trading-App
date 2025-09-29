"use client";

import { useState, useEffect } from "react";
import MobileSidebar from "./MobileSidebar";
import DesktopSidebar from "./DesktopSidebar";
import MobileWalletBar from "./MobileWalletBar";

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [showWallet, setShowWallet] = useState(true);
  const walletBarHeight = 56; // Height in px

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
      <MobileWalletBar showWallet={showWallet} open={open} setOpen={setOpen} />
      <MobileSidebar open={open} setOpen={setOpen} walletBarHeight={walletBarHeight} />
      <DesktopSidebar />
      <main className="flex-1 min-h-screen bg-gray-50" style={{ paddingTop: `${walletBarHeight}px` }}>
        {children}
      </main>
    </div>
  );
}
