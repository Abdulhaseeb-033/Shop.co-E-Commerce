"use client";

import Link from "next/link";
import { Eye, Edit3, Trash2, Star, Image as ImageIcon } from "lucide-react";
import StatusBadge from "../common/StatusBadge";

export default function ProductTable({
  products = [],
  onView,
  onEdit,
  onDelete,
}) {
  const getStockStatus = (stock) => {
    if (stock <= 0) return "Out of Stock";
    if (stock <= 5) return "Low Stock";
    return "In Stock";
  };

  const getImageSrc = (product) => {
    if (!product.images || product.images.length === 0) {
      return "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=300&q=80";
    }
    const first = product.images[0];
    if (typeof first === "string") {
      if (first.startsWith("http") || first.startsWith("blob:") || first.startsWith("data:")) {
        return first;
      }
      return `${process.env.NEXT_PUBLIC_FRONTEND_URL || ""}${first}`;
    }
    return "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=300&q=80";
  };

  return (
    <div className="w-full overflow-hidden rounded-2xl bg-white border border-gray-200/80 shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50/75 text-xs font-semibold uppercase tracking-wider text-gray-500">
              <th className="py-3.5 px-4 sm:px-6">Product</th>
              <th className="py-3.5 px-4">Category</th>
              <th className="py-3.5 px-4">Price</th>
              <th className="py-3.5 px-4 text-center">Stock</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4">Rating</th>
              <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((product) => {
              const discountedPrice =
                product.discount > 0
                  ? (product.price * (1 - product.discount / 100)).toFixed(2)
                  : Number(product.price || 0).toFixed(2);
              const stockStatus = getStockStatus(product.stock);

              return (
                <tr
                  key={product._id || product.id}
                  className="hover:bg-gray-50/80 transition-colors"
                >
                  <td className="py-3.5 px-4 sm:px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center shrink-0">
                        <img
                          src={getImageSrc(product)}
                          alt={product.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src =
                              "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=300&q=80";
                          }}
                        />
                      </div>
                      <div className="max-w-[200px] sm:max-w-xs">
                        <p className="font-bold text-gray-900 truncate text-xs sm:text-sm">
                          {product.name}
                        </p>
                        <p className="text-[11px] text-gray-400 truncate">
                          {product.dressStyle || "Casual"}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="inline-block px-2.5 py-0.5 rounded-lg bg-gray-100 text-gray-800 text-xs font-semibold">
                      {product.category}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-gray-900">${discountedPrice}</span>
                      {product.discount > 0 && (
                        <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">
                          -{product.discount}%
                        </span>
                      )}
                    </div>
                    {product.discount > 0 && (
                      <span className="text-[11px] text-gray-400 line-through block">
                        ${Number(product.price).toFixed(2)}
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-center font-bold text-gray-800">
                    {product.stock}
                  </td>

                  <td className="py-3.5 px-4">
                    <StatusBadge status={stockStatus} />
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1 text-xs font-bold text-gray-700">
                      <Star size={13} className="fill-amber-400 text-amber-400" />
                      <span>{product.rating ? Number(product.rating).toFixed(1) : "4.5"}</span>
                    </div>
                  </td>
                  
                  <td className="py-3.5 px-4 sm:px-6 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => onView && onView(product)}
                        className="p-1.5 rounded-lg text-gray-500 hover:text-black hover:bg-gray-100 transition-colors cursor-pointer"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => onEdit && onEdit(product)}
                        className="p-1.5 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                        title="Edit Product"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button
                        onClick={() => onDelete && onDelete(product)}
                        className="p-1.5 rounded-lg text-gray-500 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Delete Product"
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
