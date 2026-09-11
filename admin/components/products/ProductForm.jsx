"use client";

import { useState, useEffect } from "react";
import { Upload, X } from "lucide-react";

export default function ProductForm({
  initialData = null,
  onSubmit,
  onCancel,
  isEditing = false,
}) {
  const [formData, setFormData] = useState({
    name: "",
    shortDescription: "",
    description: "",
    price: "",
    discount: 0,
    category: "T-Shirts",
    dressStyle: "Casual",
    stock: "",
    isNewArrival: false,
    isTopSelling: false,
    images: [],
    colors: ["Black", "White"],
    sizes: ["S", "M", "L"],
    details: {
      material: "100% Cotton",
      fit: "Regular Fit",
      origin: "Imported",
      care: "Machine Wash Cold",
      pattern: "Solid",
    },
  });

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [newColor, setNewColor] = useState("");

  const categories = ["T-Shirts", "Shirts", "Jeans", "Shorts", "Hoodies", "Jackets", "Accessories"];
  const dressStyles = ["Casual", "Formal", "Party", "Gym"];
  const standardSizes = ["XS", "S", "M", "L", "XL", "XXL"];

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        shortDescription: initialData.shortDescription || "",
        description: initialData.description || "",
        price: initialData.price || "",
        discount: initialData.discount || 0,
        category: initialData.category || "T-Shirts",
        dressStyle: initialData.dressStyle || "Casual",
        stock: initialData.stock !== undefined ? initialData.stock : "",
        isNewArrival: Boolean(initialData.isNewArrival),
        isTopSelling: Boolean(initialData.isTopSelling),
        images: initialData.images || [],
        colors: initialData.colors || ["Black", "White"],
        sizes: initialData.sizes || ["S", "M", "L"],
        details: {
          material: initialData.details?.material || "100% Cotton",
          fit: initialData.details?.fit || "Regular Fit",
          origin: initialData.details?.origin || "Imported",
          care: initialData.details?.care || "Machine Wash",
          pattern: initialData.details?.pattern || "Solid",
        },
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDetailChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      details: { ...prev.details, [name]: value },
    }));
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setSelectedFiles((prev) => [...prev, ...files]);
      const previews = files.map((f) => URL.createObjectURL(f));
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...previews],
      }));
    }
  };

  const handleAddUrl = () => {
    if (imageUrlInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, imageUrlInput.trim()],
      }));
      setImageUrlInput("");
    }
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const toggleSize = (size) => {
    setFormData((prev) => {
      const exists = prev.sizes.includes(size);
      return {
        ...prev,
        sizes: exists ? prev.sizes.filter((s) => s !== size) : [...prev.sizes, size],
      };
    });
  };

  const handleAddColor = () => {
    if (newColor.trim() && !formData.colors.includes(newColor.trim())) {
      setFormData((prev) => ({
        ...prev,
        colors: [...prev.colors, newColor.trim()],
      }));
      setNewColor("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({
        ...formData,
        price: Number(formData.price),
        discount: Number(formData.discount || 0),
        stock: Number(formData.stock || 0),
        files: selectedFiles,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
      <div className="space-y-3">
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Product Name *</label>
          <input
            type="text"
            required
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. T-Shirt with Tape Details"
            className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-black"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Short Description *</label>
          <input
            type="text"
            required
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            placeholder="Brief 1-line summary"
            className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-black"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Full Description *</label>
          <textarea
            required
            rows={3}
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Detailed styling and material overview..."
            className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-black"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-white focus:outline-none"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Dress Style</label>
            <select
              name="dressStyle"
              value={formData.dressStyle}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-white focus:outline-none"
            >
              {dressStyles.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 pt-2">
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Price ($) *</label>
          <input
            type="number"
            step="0.01"
            required
            min="0"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="120.00"
            className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Discount (%)</label>
          <input
            type="number"
            min="0"
            max="100"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
            placeholder="20"
            className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Stock *</label>
          <input
            type="number"
            min="0"
            required
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="50"
            className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none"
          />
        </div>
      </div>

      <div className="flex gap-4 pt-1">
        <label className="flex items-center gap-1.5 cursor-pointer font-semibold text-gray-700">
          <input
            type="checkbox"
            name="isNewArrival"
            checked={formData.isNewArrival}
            onChange={handleChange}
            className="accent-black"
          />
          <span>New Arrival</span>
        </label>
        <label className="flex items-center gap-1.5 cursor-pointer font-semibold text-gray-700">
          <input
            type="checkbox"
            name="isTopSelling"
            checked={formData.isTopSelling}
            onChange={handleChange}
            className="accent-black"
          />
          <span>Top Selling</span>
        </label>
      </div>

      <div className="space-y-2 pt-2">
        <label className="block font-semibold text-gray-700">Product Images (Multer File or URL)</label>
        <div className="border-2 border-dashed border-gray-200 rounded-xl p-3 text-center bg-gray-50 relative hover:border-black transition-colors cursor-pointer">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileSelect}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          />
          <Upload size={18} className="mx-auto text-gray-400 mb-1" />
          <p className="text-xs text-gray-600 font-semibold">Select image files (Multer upload)</p>
        </div>

        <div className="flex gap-2">
          <input
            type="url"
            value={imageUrlInput}
            onChange={(e) => setImageUrlInput(e.target.value)}
            placeholder="Or enter existing image URL (https://...)"
            className="flex-1 px-3 py-1.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-black"
          />
          <button
            type="button"
            onClick={handleAddUrl}
            className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-xs font-semibold cursor-pointer"
          >
            Add URL
          </button>
        </div>

        {formData.images.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {formData.images.map((img, idx) => (
              <div key={idx} className="relative w-14 h-14 rounded-lg overflow-hidden border border-gray-200">
                <img src={img} alt={`Img ${idx}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(idx)}
                  className="absolute top-0.5 right-0.5 p-0.5 bg-black/70 text-white rounded hover:bg-rose-600"
                >
                  <X size={10} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-2 pt-2">
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Sizes</label>
          <div className="flex flex-wrap gap-1">
            {standardSizes.map((s) => (
              <button
                type="button"
                key={s}
                onClick={() => toggleSize(s)}
                className={`px-3 py-1 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                  formData.sizes.includes(s)
                    ? "bg-black text-white border-black"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Colors</label>
          <div className="flex gap-2 mb-1.5">
            <input
              type="text"
              value={newColor}
              onChange={(e) => setNewColor(e.target.value)}
              placeholder="e.g. Blue"
              className="px-3 py-1 rounded-xl border border-gray-200 text-xs w-36"
            />
            <button
              type="button"
              onClick={handleAddColor}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-xs font-semibold cursor-pointer"
            >
              Add Color
            </button>
          </div>
          <div className="flex flex-wrap gap-1">
            {formData.colors.map((c) => (
              <span
                key={c}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-800 text-xs font-medium"
              >
                {c}
                <button
                  type="button"
                  onClick={() => setFormData((p) => ({ ...p, colors: p.colors.filter((col) => col !== c) }))}
                  className="text-gray-400 hover:text-rose-600 cursor-pointer"
                >
                  <X size={10} />
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2">
        <div>
          <label className="block text-[11px] font-semibold text-gray-600 mb-0.5">Material</label>
          <input
            type="text"
            name="material"
            value={formData.details.material}
            onChange={handleDetailChange}
            className="w-full px-2 py-1 rounded-lg border border-gray-200 text-xs bg-gray-50"
          />
        </div>
        <div>
          <label className="block text-[11px] font-semibold text-gray-600 mb-0.5">Fit</label>
          <input
            type="text"
            name="fit"
            value={formData.details.fit}
            onChange={handleDetailChange}
            className="w-full px-2 py-1 rounded-lg border border-gray-200 text-xs bg-gray-50"
          />
        </div>
        <div>
          <label className="block text-[11px] font-semibold text-gray-600 mb-0.5">Origin</label>
          <input
            type="text"
            name="origin"
            value={formData.details.origin}
            onChange={handleDetailChange}
            className="w-full px-2 py-1 rounded-lg border border-gray-200 text-xs bg-gray-50"
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 pt-4 border-t border-gray-100">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2 rounded-xl bg-black text-white text-xs font-bold hover:bg-gray-800 transition-colors cursor-pointer"
        >
          {isEditing ? "Update Product" : "Create Product"}
        </button>
      </div>
    </form>
  );
}
