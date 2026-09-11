"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import OrderTable from "@/components/orders/OrderTable";
import OrderDetails from "@/components/orders/OrderDetails";
import Modal from "@/components/common/Modal";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import EmptyState from "@/components/common/EmptyState";
import Pagination from "@/components/common/Pagination";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://shop-co-e-commerce-coral.vercel.app";

export default function OrdersPage() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  const [viewingOrder, setViewingOrder] = useState(null);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/orders`);
      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders || []);
      }
    } catch (err) {
      console.error("Failed to fetch orders:", err);
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
    fetchOrders();
  }, [router]);

  const tabs = ["All", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const customer = o.shippingAddress
        ? `${o.shippingAddress.firstName} ${o.shippingAddress.lastName}`
        : o.user?.name || o.customer || "";

      const matchesSearch =
        o._id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.email?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTab = activeTab === "All" || o.status === activeTab;

      return matchesSearch && matchesTab;
    });
  }, [orders, searchQuery, activeTab]);

  const totalPages = Math.ceil(filteredOrders.length / pageSize) || 1;
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await fetch(`${API_BASE}/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o))
      );
    } catch (err) {
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o))
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full mx-auto animate-fade-in">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Customer Orders
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Review customer orders, shipping addresses, and manage fulfillment status.
            </p>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {tabs.map((tab) => {
              const count =
                tab === "All" ? orders.length : orders.filter((o) => o.status === tab).length;
              const isActive = activeTab === tab;

              return (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setCurrentPage(1);
                  }}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? "bg-black text-white shadow-xs"
                      : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200/80"
                  }`}
                >
                  <span>{tab}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive ? "bg-gray-800 text-gray-200" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-gray-200/80 shadow-xs">
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
                placeholder="Search by order #, customer, email..."
                className="w-full pl-9 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:outline-none focus:border-black focus:bg-white"
              />
            </div>
          </div>

          {isLoading ? (
            <LoadingSkeleton rows={6} />
          ) : paginatedOrders.length > 0 ? (
            <div className="space-y-4">
              <OrderTable
                orders={paginatedOrders}
                onView={(ord) => setViewingOrder(ord)}
              />

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={filteredOrders.length}
                pageSize={pageSize}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          ) : (
            <EmptyState
              title="No orders found"
              message={`No orders match your current filter (${activeTab}).`}
              actionLabel="View All Orders"
              onAction={() => {
                setActiveTab("All");
                setSearchQuery("");
              }}
            />
          )}
        </main>
      </div>

      <Modal isOpen={Boolean(viewingOrder)} onClose={() => setViewingOrder(null)} title="Order Details" maxWidth="max-w-2xl">
        {viewingOrder && (
          <OrderDetails
            order={viewingOrder}
            onClose={() => setViewingOrder(null)}
            onStatusUpdate={handleUpdateStatus}
          />
        )}
      </Modal>
    </div>
  );
}
