"use client";

export default function LoadingSkeleton({ type = "table", rows = 5 }) {
  if (type === "cards") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs animate-pulse space-y-3">
            <div className="h-4 w-20 bg-gray-200 rounded"></div>
            <div className="h-8 w-28 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
      <div className="divide-y divide-gray-100">
        {[...Array(rows)].map((_, i) => (
          <div key={i} className="p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-10 h-10 bg-gray-200 rounded-xl shrink-0"></div>
              <div className="space-y-1.5 flex-1 max-w-xs">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-100 rounded w-1/2"></div>
              </div>
            </div>
            <div className="h-4 w-16 bg-gray-100 rounded hidden sm:block"></div>
            <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
            <div className="h-4 w-12 bg-gray-100 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
