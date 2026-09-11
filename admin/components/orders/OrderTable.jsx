"use client";

import Link from "next/link";
import { Eye, Calendar, CreditCard, Banknote } from "lucide-react";
import StatusBadge from "../common/StatusBadge";

export default function OrderTable({ orders = [], onView }) {
  return (
    <div className="w-full overflow-hidden rounded-2xl bg-white border border-gray-200/80 shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50/75 text-xs font-semibold uppercase tracking-wider text-gray-500">
              <th className="py-3.5 px-4 sm:px-6">Order ID</th>
              <th className="py-3.5 px-4">Customer</th>
              <th className="py-3.5 px-4">Date</th>
              <th className="py-3.5 px-4">Items</th>
              <th className="py-3.5 px-4">Total</th>
              <th className="py-3.5 px-4">Payment</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.map((order) => {
              const orderId = order._id || order.id || "ORD-0000";
              const customerName =
                order.shippingAddress
                  ? `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`
                  : order.user?.name || order.customer || "Customer";

              const itemsCount =
                order.items?.reduce((sum, item) => sum + (item.quantity || 1), 0) ||
                order.items?.length ||
                1;

              const formattedDate = order.createdAt
                ? new Date(order.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "Sep 08, 2026";

              return (
                <tr key={orderId} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-3.5 px-4 sm:px-6">
                    <span className="font-mono font-bold text-gray-900 text-xs sm:text-sm">
                      #{orderId.length > 8 ? orderId.slice(-6).toUpperCase() : orderId}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <p className="font-bold text-gray-900 text-xs sm:text-sm truncate max-w-[150px]">
                      {customerName}
                    </p>
                    <p className="text-[11px] text-gray-400 truncate max-w-[150px]">
                      {order.email}
                    </p>
                  </td>

                  <td className="py-3.5 px-4 text-xs text-gray-500 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <Calendar size={12} className="text-gray-400" />
                      <span>{formattedDate}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-xs font-semibold text-gray-700">
                    {itemsCount} {itemsCount === 1 ? "item" : "items"}
                  </td>

                  <td className="py-3.5 px-4 font-bold text-gray-900 text-xs sm:text-sm">
                    ${Number(order.totalAmount || order.subtotal || 0).toFixed(2)}
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-gray-100 text-gray-700 text-[11px] font-semibold uppercase">
                      {order.paymentMethod === "cod" ? (
                        <>
                          <Banknote size={12} className="text-amber-600" />
                          <span>COD</span>
                        </>
                      ) : (
                        <>
                          <CreditCard size={12} className="text-blue-600" />
                          <span>Card</span>
                        </>
                      )}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <StatusBadge status={order.status || "Pending"} />
                  </td>

                  <td className="py-3.5 px-4 sm:px-6 text-right">
                    <button
                      onClick={() => onView && onView(order)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-black hover:text-white hover:border-black transition-colors cursor-pointer"
                    >
                      <Eye size={13} />
                      <span>View</span>
                    </button>
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
