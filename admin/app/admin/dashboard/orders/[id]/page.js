"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import OrderDetails from "@/components/orders/OrderDetails";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import EmptyState from "@/components/common/EmptyState";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://shop-co-e-commerce-coral.vercel.app";

export default function OrderDetailPage({ params }) {
  const router = useRouter();
  const unwrappedParams = typeof params?.then === "function" ? use(params) : params;
  const orderId = unwrappedParams?.id;

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrder = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/orders/${orderId}`);
      if (res.ok) {
        const data = await res.json();
        setOrder(data.order || null);
      }
    } catch (err) {
      console.error("Error fetching order:", err);
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
    if (orderId) fetchOrder();
  }, [orderId, router]);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await fetch(`${API_BASE}/api/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      setOrder((p) => ({ ...p, status: newStatus }));
    } catch (err) {
      setOrder((p) => ({ ...p, status: newStatus }));
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />

        <main className="p-4 sm:p-6 lg:p-8 max-w-4xl w-full mx-auto space-y-4 animate-fade-in">
          <Link
            href="/admin/dashboard/orders"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-black"
          >
            <ArrowLeft size={14} /> Back to Orders
          </Link>

          {isLoading ? (
            <LoadingSkeleton rows={4} />
          ) : order ? (
            <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs">
              <OrderDetails order={order} onStatusUpdate={handleStatusUpdate} />
            </div>
          ) : (
            <EmptyState
              title="Order not found"
              message={`Could not load order record with ID #${orderId}.`}
              actionLabel="Return to Orders"
              onAction={() => router.push("/admin/dashboard/orders")}
            />
          )}
        </main>
      </div>
    </div>
  );
}
