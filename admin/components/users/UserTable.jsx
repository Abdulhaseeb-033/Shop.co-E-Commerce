"use client";

import { Eye, Trash2, Mail, Calendar } from "lucide-react";
import StatusBadge from "../common/StatusBadge";

export default function UserTable({ users = [], onView, onDelete }) {
  const customerUsers = users.filter((u) => u.role !== "admin");

  return (
    <div className="w-full overflow-hidden rounded-2xl bg-white border border-gray-200/80 shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50/75 text-xs font-semibold uppercase tracking-wider text-gray-500">
              <th className="py-3.5 px-4 sm:px-6">Customer</th>
              <th className="py-3.5 px-4">Joined Date</th>
              <th className="py-3.5 px-4 text-center">Orders</th>
              <th className="py-3.5 px-4">Total Spent</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {customerUsers.map((user) => {
              const userId = user._id || user.id;
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
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "Jan 12, 2026";

              const isActive = user.isActive !== undefined ? user.isActive : user.status !== "Inactive";

              return (
                <tr key={userId} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-3.5 px-4 sm:px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-black text-white font-bold text-xs flex items-center justify-center shrink-0">
                        {initials}
                      </div>
                      <div className="max-w-[180px] sm:max-w-xs">
                        <p className="font-bold text-gray-900 text-xs sm:text-sm truncate">
                          {user.name}
                        </p>
                        <p className="text-[11px] text-gray-400 flex items-center gap-1 truncate">
                          <Mail size={11} /> {user.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-xs text-gray-500 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <Calendar size={12} className="text-gray-400" />
                      <span>{formattedDate}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-center font-bold text-gray-800 text-xs">
                    {user.ordersCount || user.orders || 0}
                  </td>

                  <td className="py-3.5 px-4 font-bold text-gray-900 text-xs sm:text-sm">
                    ${Number(user.totalSpent || 0).toFixed(2)}
                  </td>

                  <td className="py-3.5 px-4">
                    <StatusBadge status={isActive ? "Active" : "Inactive"} />
                  </td>

                  <td className="py-3.5 px-4 sm:px-6 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => onView && onView(user)}
                        className="p-1.5 rounded-lg text-gray-500 hover:text-black hover:bg-gray-100 transition-colors cursor-pointer"
                        title="View Customer"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => onDelete && onDelete(user)}
                        className="p-1.5 rounded-lg text-gray-500 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Delete Customer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
