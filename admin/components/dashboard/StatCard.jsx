"use client";

import { TrendingUp, TrendingDown } from "lucide-react";

export default function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  trendType = "up",
  iconBg = "bg-black text-white",
}) {
  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-200/80 shadow-xs hover:shadow-md transition-all">
      <div className="flex items-center justify-between">
        <span className="text-xs sm:text-sm font-semibold text-gray-500">{title}</span>
        {Icon && (
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg} shadow-xs`}>
            <Icon size={18} />
          </div>
        )}
      </div>

      <div className="mt-3">
        <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">{value}</h3>
      </div>

      {trend && (
        <div className="mt-2.5 flex items-center gap-1.5 text-xs">
          <span
            className={`inline-flex items-center gap-0.5 font-bold px-1.5 py-0.5 rounded-md ${
              trendType === "up"
                ? "text-emerald-700 bg-emerald-50"
                : "text-rose-700 bg-rose-50"
            }`}
          >
            {trendType === "up" ? (
              <TrendingUp size={12} className="shrink-0" />
            ) : (
              <TrendingDown size={12} className="shrink-0" />
            )}
            {trend}
          </span>
          <span className="text-gray-400">vs last month</span>
        </div>
      )}
    </div>
  );
}
