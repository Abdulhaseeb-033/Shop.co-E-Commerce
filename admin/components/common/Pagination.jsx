"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  pageSize = 10,
  onPageChange,
}) {
  if (totalPages <= 1 && totalItems <= pageSize) return null;

  const start = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-3 px-1 text-xs text-gray-500">
      {totalItems > 0 && (
        <p>
          Showing <span className="font-bold text-gray-900">{start}</span> to{" "}
          <span className="font-bold text-gray-900">{end}</span> of{" "}
          <span className="font-bold text-gray-900">{totalItems}</span> entries
        </p>
      )}

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange && onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
        >
          <ChevronLeft size={15} />
        </button>

        {[...Array(totalPages)].map((_, i) => {
          const page = i + 1;
          const isActive = page === currentPage;
          return (
            <button
              key={page}
              onClick={() => onPageChange && onPageChange(page)}
              className={`w-7 h-7 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? "bg-black text-white"
                  : "text-gray-700 hover:bg-gray-100 border border-transparent"
              }`}
            >
              {page}
            </button>
          );
        })}

        <button
          onClick={() => onPageChange && onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
        >
          <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
}
