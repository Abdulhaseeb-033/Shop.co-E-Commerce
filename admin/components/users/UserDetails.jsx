"use client";

import { Mail, Phone, MapPin, Calendar, ShoppingBag, DollarSign } from "lucide-react";
import StatusBadge from "../common/StatusBadge";

export default function UserDetails({ user, onClose }) {
  if (!user) return null;

  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  const formattedDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "Jan 15, 2026";

  const isActive = user.isActive !== undefined ? user.isActive : user.status !== "Inactive";

  return (
    <div className="space-y-4 text-gray-800 text-xs sm:text-sm">
      <div className="flex items-center gap-3 p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
        <div className="w-11 h-11 rounded-full bg-black text-white font-bold text-sm flex items-center justify-center shrink-0">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="font-bold text-sm text-gray-900 truncate">{user.name}</h4>
            <StatusBadge status={isActive ? "Active" : "Inactive"} />
          </div>
          <p className="text-xs text-gray-500 truncate flex items-center gap-1 mt-0.5">
            <Mail size={12} /> {user.email}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        <div className="p-3 bg-white rounded-xl border border-gray-100">
          <span className="text-[11px] text-gray-400 font-medium flex items-center gap-1">
            <ShoppingBag size={12} /> Orders
          </span>
          <p className="text-base font-bold text-gray-900 mt-1">
            {user.ordersCount || user.orders || 0}
          </p>
        </div>

        <div className="p-3 bg-white rounded-xl border border-gray-100">
          <span className="text-[11px] text-gray-400 font-medium flex items-center gap-1">
            <DollarSign size={12} /> Total Spent
          </span>
          <p className="text-base font-bold text-gray-900 mt-1">
            ${Number(user.totalSpent || 0).toFixed(2)}
          </p>
        </div>

        <div className="p-3 bg-white rounded-xl border border-gray-100 col-span-2 sm:col-span-1">
          <span className="text-[11px] text-gray-400 font-medium flex items-center gap-1">
            <Calendar size={12} /> Joined
          </span>
          <p className="text-xs font-bold text-gray-900 mt-1.5 truncate">{formattedDate}</p>
        </div>
      </div>

      <div className="p-3.5 bg-white rounded-xl border border-gray-100 space-y-2">
        <h5 className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
          Contact Information
        </h5>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <div>
            <span className="text-gray-400 block text-[10px]">Email Address</span>
            <span className="font-semibold text-gray-900">{user.email}</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[10px]">Phone Number</span>
            <span className="font-semibold text-gray-900">{user.phone || "+1 (555) 234-5678"}</span>
          </div>
          <div className="sm:col-span-2">
            <span className="text-gray-400 block text-[10px]">Delivery Address</span>
            <span className="font-semibold text-gray-900">
              {user.address || "142 Fashion Blvd, Suite 4B, New York, NY 10001"}
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-2 border-t border-gray-100">
        <button
          onClick={onClose}
          className="px-4 py-1.5 bg-black hover:bg-gray-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
}
