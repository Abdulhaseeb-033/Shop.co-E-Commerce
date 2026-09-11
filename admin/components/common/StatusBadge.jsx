"use client";

export default function StatusBadge({ status }) {
  if (!status && status !== false) return null;

  const normalized = String(status).toLowerCase().trim();

  let styles = "bg-gray-100 text-gray-700 border-gray-200";
  let dotColor = "bg-gray-400";

  if (normalized === "delivered" || normalized === "in stock" || normalized === "active" || normalized === "true") {
    styles = "bg-emerald-50 text-emerald-700 border-emerald-200";
    dotColor = "bg-emerald-500";
  } else if (normalized === "shipped" || normalized === "processing") {
    styles = "bg-blue-50 text-blue-700 border-blue-200";
    dotColor = "bg-blue-500";
  } else if (normalized === "pending" || normalized === "low stock") {
    styles = "bg-amber-50 text-amber-700 border-amber-200";
    dotColor = "bg-amber-500";
  } else if (normalized === "cancelled" || normalized === "out of stock" || normalized === "inactive" || normalized === "false") {
    styles = "bg-rose-50 text-rose-700 border-rose-200";
    dotColor = "bg-rose-500";
  }

  const displayText =
    normalized === "true" ? "Active" : normalized === "false" ? "Inactive" : status;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
      {displayText}
    </span>
  );
}
