import React from "react";

interface SkeletonProps {
  className?: string;
   style?: React.CSSProperties; 
}

/** Simple block skeleton */
export const Skeleton: React.FC<SkeletonProps> = ({ className, style }) => {
  return <div className={`bg-gray-300 rounded animate-pulse ${className}`} style={style} />;
};

/** Skeleton for card (products) */
export const SkeletonCard: React.FC = () => (
  <div className="border rounded p-4 shadow space-y-2">
    <Skeleton className="h-6 w-3/4" />
    <Skeleton className="h-4 w-1/2" />
    <Skeleton className="h-4 w-1/3" />
  </div>
);

/** Skeleton for table row (portfolio transactions) */
export const SkeletonRow: React.FC = () => (
  <div className="h-4 bg-gray-300 rounded w-full animate-pulse mb-2" />
);

/** Skeleton for list item (watchlist) */
export const SkeletonListItem: React.FC = () => (
  <div className="flex items-center justify-between border rounded p-3 animate-pulse mb-2">
    <div className="space-y-1 w-3/4">
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-3 w-1/3" />
    </div>
    <div className="space-x-2 flex">
      <Skeleton className="h-6 w-12" />
      <Skeleton className="h-6 w-12" />
    </div>
  </div>
);

/** Skeleton for chart placeholder */
export const SkeletonChart: React.FC<{ height?: number }> = ({ height = 300 }) => (
  <Skeleton className={`w-full`} style={{ height }} />
);

/** Skeleton for text line (summary / labels) */
export const SkeletonText: React.FC<{ width?: string | number; height?: number }> = ({
  width = "100%",
  height = 16,
}) => <Skeleton className={`w-[${width}] h-[${height}px]`} />;
