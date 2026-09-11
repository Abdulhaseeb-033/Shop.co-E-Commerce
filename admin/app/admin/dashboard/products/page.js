"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Plus, Search } from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import ProductTable from "@/components/products/ProductTable";
import ProductForm from "@/components/products/ProductForm";
import ProductDetails from "@/components/products/ProductDetails";
import Modal from "@/components/common/Modal";
import ConfirmModal from "@/components/common/ConfirmModal";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import EmptyState from "@/components/common/EmptyState";
import Pagination from "@/components/common/Pagination";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://shop-co-e-commerce-coral.vercel.app";

export default function ProductsPage() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [viewingProduct, setViewingProduct] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/products`);
      if (res.ok) {
        const data = await res.json();
        setProducts(data.products || []);
      }
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth");
    if (!auth) {
      router.push("/admin/login");
      return;
    }
    fetchProducts();
  }, [router]);

  const categories = ["All", "T-Shirts", "Shirts", "Jeans", "Shorts", "Hoodies"];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  const totalPages = Math.ceil(filteredProducts.length / pageSize) || 1;
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleCreateProduct = async (formPayload) => {
    try {
      const formData = new FormData();
      formData.append("name", formPayload.name);
      formData.append("shortDescription", formPayload.shortDescription);
      formData.append("description", formPayload.description);
      formData.append("price", formPayload.price);
      formData.append("discount", formPayload.discount);
      formData.append("category", formPayload.category);
      formData.append("dressStyle", formPayload.dressStyle);
      formData.append("stock", formPayload.stock);
      formData.append("isNewArrival", String(formPayload.isNewArrival));
      formData.append("isTopSelling", String(formPayload.isTopSelling));
      formData.append("colors", JSON.stringify(formPayload.colors || []));
      formData.append("sizes", JSON.stringify(formPayload.sizes || []));
      formData.append("details", JSON.stringify(formPayload.details || {}));

      if (formPayload.files && formPayload.files.length > 0) {
        formPayload.files.forEach((file) => {
          formData.append("images", file);
        });
      }

      const res = await fetch(`${API_BASE}/api/products`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const result = await res.json();
        setProducts([result.product || formPayload, ...products]);
      } else {
        setProducts([{ ...formPayload, _id: `prod-${Date.now()}` }, ...products]);
      }
    } catch (err) {
      setProducts([{ ...formPayload, _id: `prod-${Date.now()}` }, ...products]);
    } finally {
      setIsAddOpen(false);
    }
  };

  const handleUpdateProduct = async (formPayload) => {
    const productId = editingProduct._id || editingProduct.id;
    try {
      await fetch(`${API_BASE}/api/products/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formPayload),
      });
      setProducts(
        products.map((p) => ((p._id || p.id) === productId ? { ...p, ...formPayload } : p))
      );
    } catch (err) {
      setProducts(
        products.map((p) => ((p._id || p.id) === productId ? { ...p, ...formPayload } : p))
      );
    } finally {
      setEditingProduct(null);
    }
  };

  const handleDeleteProduct = async () => {
    if (!deletingProduct) return;
    const productId = deletingProduct._id || deletingProduct.id;
    try {
      await fetch(`${API_BASE}/api/products/${productId}`, {
        method: "DELETE",
      });
      setProducts(products.filter((p) => (p._id || p.id) !== productId));
    } catch (err) {
      setProducts(products.filter((p) => (p._id || p.id) !== productId));
    } finally {
      setDeletingProduct(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full mx-auto animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                Products
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                Manage your store catalog, pricing, and stock levels.
              </p>
            </div>

            <button
              onClick={() => setIsAddOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-black hover:bg-gray-800 text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <Plus size={16} />
              <span>Add Product</span>
            </button>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Search size={15} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search products..."
                className="w-full pl-9 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:outline-none focus:border-black focus:bg-white"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs font-semibold text-gray-500">Category:</span>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-800 bg-white focus:outline-none cursor-pointer"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {isLoading ? (
            <LoadingSkeleton rows={6} />
          ) : paginatedProducts.length > 0 ? (
            <div className="space-y-4">
              <ProductTable
                products={paginatedProducts}
                onView={(p) => setViewingProduct(p)}
                onEdit={(p) => setEditingProduct(p)}
                onDelete={(p) => setDeletingProduct(p)}
              />

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={filteredProducts.length}
                pageSize={pageSize}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          ) : (
            <EmptyState
              title="No products found"
              message="No products match your current search or category filter."
              actionLabel="Clear Filters"
              onAction={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
            />
          )}
        </main>
      </div>

      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="Add Product" maxWidth="max-w-2xl">
        <ProductForm onSubmit={handleCreateProduct} onCancel={() => setIsAddOpen(false)} isEditing={false} />
      </Modal>

      <Modal isOpen={Boolean(editingProduct)} onClose={() => setEditingProduct(null)} title="Edit Product" maxWidth="max-w-2xl">
        {editingProduct && (
          <ProductForm initialData={editingProduct} onSubmit={handleUpdateProduct} onCancel={() => setEditingProduct(null)} isEditing={true} />
        )}
      </Modal>

      <Modal isOpen={Boolean(viewingProduct)} onClose={() => setViewingProduct(null)} title="Product Details" maxWidth="max-w-2xl">
        {viewingProduct && <ProductDetails product={viewingProduct} onClose={() => setViewingProduct(null)} onEdit={(p) => { setViewingProduct(null); setEditingProduct(p); }} />}
      </Modal>

      <ConfirmModal
        isOpen={Boolean(deletingProduct)}
        onClose={() => setDeletingProduct(null)}
        onConfirm={handleDeleteProduct}
        title="Delete Product"
        message={`Are you sure you want to delete "${deletingProduct?.name}"?`}
        confirmText="Delete Product"
      />
    </div>
  );
}
