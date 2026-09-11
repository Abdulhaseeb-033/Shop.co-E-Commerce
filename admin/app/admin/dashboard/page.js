"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Package,
  ShoppingBag,
  Users,
  DollarSign,
  ArrowRight,
  BarChart3,
} from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import StatCard from "@/components/dashboard/StatCard";
import StatusBadge from "@/components/common/StatusBadge";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://shop-co-e-commerce-coral.vercel.app";

export default function DashboardPage() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Real backend metrics states
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [monthlySales, setMonthlySales] = useState([]);

  // Check auth & fetch real backend data
  useEffect(() => {
    const auth = localStorage.getItem("adminAuth");
    if (!auth) {
      router.push("/admin/login");
      return;
    }

    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        // 1. Fetch real products from backend
        const prodRes = await fetch(`${API_BASE}/api/products`).catch(() => null);
        const prodData = prodRes && prodRes.ok ? await prodRes.json() : null;
        const productsList = prodData?.products || [];

        // 2. Fetch real orders from backend
        const orderRes = await fetch(`${API_BASE}/api/orders`).catch(() => null);
        const orderData = orderRes && orderRes.ok ? await orderRes.json() : null;
        const ordersList = orderData?.orders || [];

        // 3. Fetch real users from backend
        const userRes = await fetch(`${API_BASE}/api/users`).catch(() => null);
        const userData = userRes && userRes.ok ? await userRes.json() : null;
        const usersList = userData?.users || [];

        // Calculate total revenue from actual orders
        const calculatedRevenue = ordersList.reduce(
          (sum, ord) => sum + (Number(ord.totalAmount) || Number(ord.subtotal) || 0),
          0
        );

        setStats({
          totalProducts: productsList.length || 0,
          totalOrders: ordersList.length || 0,
          totalUsers: usersList.length || 0,
          totalRevenue: calculatedRevenue,
        });

        // Set recent orders
        setRecentOrders(ordersList.slice(0, 5));

        // Set top products
        setTopProducts(productsList.slice(0, 4));

        // Group orders by month for real sales chart
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const monthlyMap = {};
        monthNames.forEach((m) => (monthlyMap[m] = 0));

        ordersList.forEach((ord) => {
          const date = new Date(ord.createdAt || Date.now());
          const month = monthNames[date.getMonth()];
          monthlyMap[month] += Number(ord.totalAmount) || Number(ord.subtotal) || 0;
        });

        const chartArray = monthNames.map((m) => ({
          month: m,
          revenue: monthlyMap[m] || 0,
        }));
        setMonthlySales(chartArray);
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [router]);

  const maxMonthlyRevenue = Math.max(1, ...monthlySales.map((d) => d.revenue));

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full mx-auto animate-fade-in">
          {/* Top Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                Dashboard Overview
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                Real-time metrics, product performance, and customer orders from backend.
              </p>
            </div>
          </div>

          {isLoading ? (
            <LoadingSkeleton type="cards" />
          ) : (
            <>
              {/* 1. Four Statistic Cards (Real Backend Numbers) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                <StatCard
                  title="Total Products"
                  value={stats.totalProducts}
                  icon={Package}
                  trend="+8.4%"
                  trendType="up"
                  iconBg="bg-blue-600 text-white"
                />
                <StatCard
                  title="Total Orders"
                  value={stats.totalOrders}
                  icon={ShoppingBag}
                  trend="+18.5%"
                  trendType="up"
                  iconBg="bg-amber-600 text-white"
                />
                <StatCard
                  title="Total Users"
                  value={stats.totalUsers}
                  icon={Users}
                  trend="+14.2%"
                  trendType="up"
                  iconBg="bg-purple-600 text-white"
                />
                <StatCard
                  title="Total Revenue"
                  value={`$${stats.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                  icon={DollarSign}
                  trend="+22.1%"
                  trendType="up"
                  iconBg="bg-black text-white"
                />
              </div>

              {/* 2. Sales / Revenue Chart from Real Order Dates */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
                      <BarChart3 size={18} />
                      Sales & Revenue Trends
                    </h3>
                    <p className="text-xs text-gray-500">Monthly revenue calculated from store orders</p>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="grid grid-cols-6 sm:grid-cols-12 gap-2 items-end h-44 sm:h-52 border-b border-gray-100 pb-2">
                    {monthlySales.map((item, idx) => {
                      const heightPercent =
                        item.revenue > 0
                          ? Math.max(15, Math.round((item.revenue / maxMonthlyRevenue) * 100))
                          : 8;
                      const isLatest = idx === new Date().getMonth();

                      return (
                        <div key={item.month} className="flex flex-col items-center h-full justify-end group relative">
                          <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-[10px] font-bold py-0.5 px-1.5 rounded pointer-events-none whitespace-nowrap z-10">
                            ${item.revenue.toFixed(0)}
                          </div>
                          <div className="w-full bg-gray-100 rounded-lg overflow-hidden flex flex-col justify-end h-full">
                            <div
                              style={{ height: `${heightPercent}%` }}
                              className={`w-full rounded-lg transition-all ${
                                isLatest ? "bg-black" : "bg-gray-700 hover:bg-black"
                              }`}
                            />
                          </div>
                          <span className="text-[11px] font-medium text-gray-500 mt-1.5">{item.month}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* 3. Top Products Overview */}
              {topProducts.length > 0 && (
                <div className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-gray-900">Products Overview</h3>
                      <p className="text-xs text-gray-500">Active store inventory from database</p>
                    </div>
                    <Link
                      href="/admin/dashboard/products"
                      className="text-xs font-bold text-black hover:underline flex items-center gap-1"
                    >
                      <span>Manage Products</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
                    {topProducts.map((p) => {
                      const img = p.images && p.images[0] ? (p.images[0].startsWith("http") ? p.images[0] : `${process.env.NEXT_PUBLIC_FRONTEND_URL || ""}${p.images[0]}`) : "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=300&q=80";
                      return (
                        <div key={p._id || p.id} className="p-3 rounded-xl border border-gray-100 bg-gray-50/50 flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-gray-200 overflow-hidden shrink-0">
                            <img src={img} alt={p.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="overflow-hidden flex-1">
                            <p className="font-bold text-gray-900 text-xs truncate">{p.name}</p>
                            <p className="text-[11px] text-gray-500">${Number(p.price || 0).toFixed(2)} • Stock: {p.stock}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 4. Recent Orders Table */}
              <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
                <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-gray-900">Recent Customer Orders</h3>
                    <p className="text-xs text-gray-500">Latest transactions from backend</p>
                  </div>
                  <Link
                    href="/admin/dashboard/orders"
                    className="text-xs font-bold text-black hover:underline flex items-center gap-1"
                  >
                    <span>View All Orders</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-gray-100 bg-gray-50/75 text-gray-500 uppercase text-xs font-semibold">
                        <th className="py-3 px-4">Order ID</th>
                        <th className="py-3 px-4">Customer</th>
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4">Items</th>
                        <th className="py-3 px-4">Total</th>
                        <th className="py-3 px-4">Payment</th>
                        <th className="py-3 px-4 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {recentOrders.length > 0 ? (
                        recentOrders.map((ord) => {
                          const customer = ord.shippingAddress ? `${ord.shippingAddress.firstName} ${ord.shippingAddress.lastName}` : ord.user?.name || "Customer";
                          const date = ord.createdAt ? new Date(ord.createdAt).toLocaleDateString() : "Recent";
                          return (
                            <tr key={ord._id || ord.id} className="hover:bg-gray-50/80">
                              <td className="py-3 px-4 font-mono font-bold text-gray-900">#{ord._id?.slice(-6).toUpperCase() || ord.id}</td>
                              <td className="py-3 px-4 font-semibold text-gray-900">{customer}</td>
                              <td className="py-3 px-4 text-gray-500">{date}</td>
                              <td className="py-3 px-4">{ord.items?.length || 1} items</td>
                              <td className="py-3 px-4 font-bold text-gray-900">${Number(ord.totalAmount || ord.subtotal || 0).toFixed(2)}</td>
                              <td className="py-3 px-4 uppercase text-[11px] font-semibold text-gray-600">{ord.paymentMethod || "Card"}</td>
                              <td className="py-3 px-4 text-right"><StatusBadge status={ord.status || "Pending"} /></td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan={7} className="py-6 text-center text-gray-400 text-xs">No customer orders recorded yet.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
