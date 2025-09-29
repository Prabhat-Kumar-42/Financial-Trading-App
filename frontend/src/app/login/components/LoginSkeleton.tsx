"use client";

import { Skeleton } from "@/components/Skeleton";

export default function LoginSkeleton() {
  return (
    <>
      <Skeleton className="h-10 w-full rounded" />
      <Skeleton className="h-10 w-full rounded" />
      <Skeleton className="h-10 w-full rounded" />
    </>
  );
}
