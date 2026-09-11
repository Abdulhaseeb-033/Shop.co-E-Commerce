"use client";

import { useState } from "react";
import { Star, Package, Layers, Sparkles, HelpCircle, MessageSquare } from "lucide-react";
import StatusBadge from "../common/StatusBadge";

export default function ProductDetails({ product, onClose, onEdit }) {
  if (!product) return null;

  const [selectedImg, setSelectedImg] = useState(
    product.images && product.images.length > 0 ? product.images[0] : ""
  );

  const getImageSrc = (img) => {
    if (!img) return "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80";
    if (img.startsWith("http") || img.startsWith("blob:") || img.startsWith("data:")) return img;
    return `${process.env.NEXT_PUBLIC_FRONTEND_URL || ""}${img}`;
  };

  const discountedPrice =
    product.discount > 0
      ? (product.price * (1 - product.discount / 100)).toFixed(2)
      : Number(product.price || 0).toFixed(2);

  return (
    <div className="space-y-5 text-gray-800 text-xs sm:text-sm">
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
        <div className="sm:col-span-5 space-y-2">
          <div className="w-full aspect-square rounded-2xl bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center">
            <img
              src={getImageSrc(selectedImg || product.images?.[0])}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src =
                  "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80";
              }}
            />
          </div>
          {product.images && product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImg(img)}
                  className={`w-12 h-12 rounded-lg overflow-hidden border-2 shrink-0 cursor-pointer ${
                    (selectedImg || product.images[0]) === img ? "border-black" : "border-gray-200 opacity-60"
                  }`}
                >
                  <img src={getImageSrc(img)} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="sm:col-span-7 space-y-2.5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
              {product.category}
            </span>
            <span className="text-gray-300">•</span>
            <span className="text-[11px] text-gray-500">{product.dressStyle}</span>
          </div>

          <h3 className="text-lg sm:text-xl font-extrabold text-gray-900">{product.name}</h3>
          <p className="text-xs text-gray-500">{product.shortDescription}</p>

          <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-gray-400 block">Price</span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-xl font-extrabold text-gray-900">${discountedPrice}</span>
                {product.discount > 0 && (
                  <span className="text-xs font-bold text-rose-600 bg-rose-50 px-1.5 rounded">
                    -{product.discount}% OFF
                  </span>
                )}
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-gray-400 block">Inventory</span>
              <span className="font-bold text-gray-900">{product.stock} in stock</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {product.isNewArrival && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-black text-white">
                <Sparkles size={10} /> New Arrival
              </span>
            )}
            {product.isTopSelling && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                Top Selling
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="p-3 bg-white rounded-xl border border-gray-100 space-y-1">
        <h4 className="text-xs font-bold text-gray-900">Description</h4>
        <p className="text-xs text-gray-600 leading-relaxed">{product.description}</p>
      </div>

      <div className="space-y-1.5">
        <h4 className="text-xs font-bold text-gray-900 flex items-center gap-1">
          <Layers size={13} /> Specifications
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
          <div className="p-2 bg-gray-50 rounded-lg">
            <span className="text-gray-400 block text-[10px]">Material</span>
            <span className="font-semibold text-gray-900">{product.details?.material || "100% Cotton"}</span>
          </div>
          <div className="p-2 bg-gray-50 rounded-lg">
            <span className="text-gray-400 block text-[10px]">Fit</span>
            <span className="font-semibold text-gray-900">{product.details?.fit || "Regular Fit"}</span>
          </div>
          <div className="p-2 bg-gray-50 rounded-lg">
            <span className="text-gray-400 block text-[10px]">Origin</span>
            <span className="font-semibold text-gray-900">{product.details?.origin || "Imported"}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-1">
        <div>
          <span className="text-xs font-bold text-gray-900 block mb-1">Sizes</span>
          <div className="flex flex-wrap gap-1">
            {product.sizes?.map((s) => (
              <span key={s} className="px-2 py-0.5 bg-gray-100 rounded text-xs font-bold text-gray-800">
                {s}
              </span>
            ))}
          </div>
        </div>
        <div>
          <span className="text-xs font-bold text-gray-900 block mb-1">Colors</span>
          <div className="flex flex-wrap gap-1">
            {product.colors?.map((c) => (
              <span key={c} className="px-2 py-0.5 bg-gray-100 rounded-full text-xs font-medium text-gray-800">
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        {onEdit && (
          <button
            onClick={() => onEdit(product)}
            className="px-4 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            Edit Product
          </button>
        )}
        {onClose && (
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-black hover:bg-gray-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer ml-auto"
          >
            Close
          </button>
        )}
      </div>
    </div>
  );
}
