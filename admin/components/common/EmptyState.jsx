"use client";

import { PackageOpen } from "lucide-react";

export default function EmptyState({
  title = "No data found",
  message = "There are no records matching your request.",
  actionLabel,
  onAction,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center bg-white rounded-2xl border border-gray-100">
      <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400 mb-3 border border-gray-200/60">
        <PackageOpen size={26} strokeWidth={1.5} />
      </div>
      <h3 className="text-sm font-bold text-gray-900">{title}</h3>
      <p className="text-xs text-gray-500 max-w-xs mt-1 mb-4">{message}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-4 py-2 text-xs font-bold text-white bg-black rounded-xl hover:bg-gray-800 transition-colors shadow-xs cursor-pointer"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
