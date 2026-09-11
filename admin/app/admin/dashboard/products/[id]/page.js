"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import ProductDetails from "@/components/products/ProductDetails";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import EmptyState from "@/components/common/EmptyState";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://shop-co-e-commerce-coral.vercel.app";

export default function ProductDetailPage({ params }) {
  const router = useRouter();
  const unwrappedParams = typeof params?.then === "function" ? use(params) : params;
  const productId = unwrappedParams?.id;

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth");
    if (!auth) {
      router.push("/admin/login");
      return;
    }

    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${API_BASE}/api/products/${productId}`);
        if (res.ok) {
          const data = await res.json();
          setProduct(data.product || null);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (productId) fetchProduct();
  }, [productId, router]);

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />

        <main className="p-4 sm:p-6 lg:p-8 max-w-5xl w-full mx-auto space-y-4 animate-fade-in">
          <Link
            href="/admin/dashboard/products"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-black"
          >
            <ArrowLeft size={14} /> Back to Products
          </Link>

          {isLoading ? (
            <LoadingSkeleton rows={4} />
          ) : product ? (
            <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs">
              <ProductDetails product={product} />
            </div>
          ) : (
            <EmptyState
              title="Product not found"
              message={`Could not load product with ID #${productId}.`}
              actionLabel="Return to Products"
              onAction={() => router.push("/admin/dashboard/products")}
            />
          )}
        </main>
      </div>
    </div>
  );
}
