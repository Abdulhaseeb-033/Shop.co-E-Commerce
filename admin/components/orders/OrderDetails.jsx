"use client";

import { useState } from "react";
import { Package, Mail, Phone, MapPin, Printer, CheckCircle2 } from "lucide-react";
import StatusBadge from "../common/StatusBadge";

export default function OrderDetails({ order: initialOrder, onClose, onStatusUpdate }) {
  if (!initialOrder) return null;

  const [order, setOrder] = useState(initialOrder);
  const [currentStatus, setCurrentStatus] = useState(initialOrder.status || "Pending");
  const [successMsg, setSuccessMsg] = useState("");

  const orderId = order._id || order.id || "ORD-0000";
  const statuses = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

  const handleStatusChange = async (newStatus) => {
    setCurrentStatus(newStatus);
    setOrder((p) => ({ ...p, status: newStatus }));

    if (onStatusUpdate) {
      onStatusUpdate(orderId, newStatus);
    }
    setSuccessMsg(`Status updated to "${newStatus}"`);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const customerName = order.shippingAddress
    ? `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`
    : order.user?.name || order.customer || "Customer";

  const formattedDate = order.createdAt
    ? new Date(order.createdAt).toLocaleDateString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Sep 08, 2026";

  const getImageSrc = (img) => {
    if (!img) return "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=300&q=80";
    if (img.startsWith("http") || img.startsWith("blob:") || img.startsWith("data:")) return img;
    return `${process.env.NEXT_PUBLIC_FRONTEND_URL || ""}${img}`;
  };

  return (
    <div className="space-y-4 text-gray-800 text-xs sm:text-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
            Order Reference
          </span>
          <h3 className="text-base font-mono font-bold text-gray-900">#{orderId}</h3>
          <p className="text-[11px] text-gray-500 mt-0.5">Placed on {formattedDate}</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-600">Status:</span>
          <select
            value={currentStatus}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="px-2.5 py-1 rounded-lg text-xs font-bold border border-gray-200 bg-white cursor-pointer focus:outline-none"
          >
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {successMsg && (
        <div className="p-2.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-semibold flex items-center gap-1.5">
          <CheckCircle2 size={14} />
          <span>{successMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="p-3 bg-white rounded-xl border border-gray-100 space-y-1.5">
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
            Customer
          </h4>
          <p className="font-bold text-gray-900">{customerName}</p>
          <p className="text-xs text-gray-500 flex items-center gap-1">
            <Mail size={12} /> {order.email}
          </p>
          <p className="text-xs text-gray-500 flex items-center gap-1">
            <Phone size={12} /> {order.phone || "+1 (555) 019-2834"}
          </p>
        </div>

        <div className="p-3 bg-white rounded-xl border border-gray-100 space-y-1">
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1">
            <MapPin size={12} /> Shipping Address
          </h4>
          <p className="text-xs text-gray-700 leading-relaxed">
            {order.shippingAddress ? (
              <>
                {order.shippingAddress.address} {order.shippingAddress.apartment && `, ${order.shippingAddress.apartment}`}
                <br />
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
                <br />
                {order.shippingAddress.country}
              </>
            ) : (
              "742 Evergreen Terrace, Springfield, OR 97477, USA"
            )}
          </p>
        </div>
      </div>

      
      <div className="space-y-1.5">
        <h4 className="text-[11px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1">
          <Package size={13} /> Items ({order.items?.length || 1})
        </h4>

        <div className="border border-gray-100 rounded-xl overflow-hidden divide-y divide-gray-100">
          {order.items?.map((item, idx) => (
            <div key={idx} className="p-2.5 flex items-center gap-3 bg-white">
              <div className="w-10 h-10 rounded-lg bg-gray-100 border border-gray-200 overflow-hidden shrink-0">
                <img src={getImageSrc(item.image)} alt={item.name} className="w-full h-full object-cover" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-bold text-gray-900 text-xs truncate">{item.name}</p>
                <p className="text-[10px] text-gray-400">
                  {item.size && `Size: ${item.size}`} {item.color && `• Color: ${item.color}`} • Qty: {item.quantity || 1}
                </p>
              </div>

              <div className="text-right">
                <p className="font-bold text-gray-900 text-xs">
                  ${(Number(item.price || 0) * (item.quantity || 1)).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-3 bg-gray-50 rounded-xl space-y-1.5 text-xs">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span className="font-semibold text-gray-900">
            ${Number(order.subtotal || order.totalAmount || 0).toFixed(2)}
          </span>
        </div>
        {Number(order.discount || 0) > 0 && (
          <div className="flex justify-between text-rose-600">
            <span>Discount</span>
            <span className="font-semibold">-${Number(order.discount).toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between text-gray-600">
          <span>Delivery Fee</span>
          <span className="font-semibold text-gray-900">
            {Number(order.deliveryFee || 0) === 0 ? "Free" : `$${Number(order.deliveryFee).toFixed(2)}`}
          </span>
        </div>
        <div className="pt-1.5 border-t border-gray-200 flex justify-between text-sm font-extrabold text-gray-900">
          <span>Total Amount</span>
          <span>${Number(order.totalAmount || order.subtotal || 0).toFixed(2)}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
        <button
          onClick={() => window.print()}
          className="px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-xs font-semibold text-gray-700 flex items-center gap-1 cursor-pointer"
        >
          <Printer size={13} />
          <span>Print</span>
        </button>

        {onClose && (
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-black hover:bg-gray-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            Close
          </button>
        )}
      </div>
    </div>
  );
}
