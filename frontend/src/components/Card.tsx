import { ReactNode } from "react";
import clsx from "clsx";

// /src/components/Card.tsx
type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={clsx(
        "rounded-2xl border shadow-sm p-4",
        className
      )}
    >
      {children}
    </div>
  );
}
