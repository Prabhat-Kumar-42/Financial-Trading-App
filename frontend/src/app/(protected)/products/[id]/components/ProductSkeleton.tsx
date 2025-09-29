"use client";

import { Skeleton, SkeletonText, SkeletonChart } from "@/components/Skeleton";

export function ProductSkeleton() {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <SkeletonText width="50%" height={32} />
      <SkeletonText width="30%" />
      <SkeletonText width="20%" />
      <Skeleton className="h-10 w-32" />
      <SkeletonChart height={300} />
      <SkeletonText width="25%" height={24} />
      <Skeleton className="h-10 w-32" />
    </div>
  );
}

