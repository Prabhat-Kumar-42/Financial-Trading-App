"use client";
import { Skeleton, SkeletonRow, SkeletonText, SkeletonListItem } from "@/components/Skeleton";

export function PortfolioSkeleton() {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        <Skeleton className="h-8 w-1/4" />
      </h1>

      {/* Summary Skeleton */}
      <div className="space-y-2 bg-white shadow rounded-lg p-6">
        <SkeletonText width="40%" />
        <SkeletonText width="60%" />
        <SkeletonText width="50%" />
        <SkeletonText width="70%" />
      </div>

      {/* Transactions Skeleton */}
      <div className="space-y-2 bg-white shadow rounded-lg p-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <SkeletonRow key={i} />
        ))}
      </div>

      {/* Watchlist Skeleton */}
      <div className="space-y-2 bg-white shadow rounded-lg p-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <SkeletonListItem key={i} />
        ))}
      </div>
    </div>
  );
}
