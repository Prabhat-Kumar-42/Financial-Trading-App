import Link from "next/link";

// src/components/EmptyState.tsx
interface EmptyStateProps {
  title: string;
  message: string;
  actionLabel?: string;
  actionHref?: string;
}

export function EmptyState({ title, message, actionLabel, actionHref }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center text-gray-600">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="mb-4">{message}</p>
      {actionHref && actionLabel && (
        <Link
          href={actionHref}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
