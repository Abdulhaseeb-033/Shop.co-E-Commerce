"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import UserTable from "@/components/users/UserTable";
import UserDetails from "@/components/users/UserDetails";
import Modal from "@/components/common/Modal";
import ConfirmModal from "@/components/common/ConfirmModal";
import LoadingSkeleton from "@/components/common/LoadingSkeleton";
import EmptyState from "@/components/common/EmptyState";
import Pagination from "@/components/common/Pagination";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://shop-co-e-commerce-coral.vercel.app";

export default function UsersPage() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  const [viewingUser, setViewingUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/users`);
      if (res.ok) {
        const data = await res.json();
        setUsers(data.users || []);
      }
    } catch (err) {
      console.error("Failed to fetch users:", err);
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
    fetchUsers();
  }, [router]);

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      if (u.role === "admin") return false;

      const matchesSearch =
        u.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchQuery.toLowerCase());

      const isActive = u.isActive !== undefined ? u.isActive : u.status !== "Inactive";

      let matchesStatus = true;
      if (statusFilter === "Active") matchesStatus = isActive === true;
      if (statusFilter === "Inactive") matchesStatus = isActive === false;

      return matchesSearch && matchesStatus;
    });
  }, [users, searchQuery, statusFilter]);

  const totalPages = Math.ceil(filteredUsers.length / pageSize) || 1;
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleDeleteUser = async () => {
    if (!deletingUser) return;
    const userId = deletingUser._id || deletingUser.id;
    try {
      await fetch(`${API_BASE}/api/users/${userId}`, {
        method: "DELETE",
      });
      setUsers(users.filter((u) => (u._id || u.id) !== userId));
    } catch (err) {
      setUsers(users.filter((u) => (u._id || u.id) !== userId));
    } finally {
      setDeletingUser(null);
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
              Users & Customers
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Manage registered customers, view activity, and monitor account status.
            </p>
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
                placeholder="Search customers..."
                className="w-full pl-9 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:outline-none focus:border-black focus:bg-white"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs font-semibold text-gray-500">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-800 bg-white focus:outline-none cursor-pointer"
              >
                <option value="All">All Statuses</option>
                <option value="Active">Active Only</option>
                <option value="Inactive">Inactive Only</option>
              </select>
            </div>
          </div>

          {isLoading ? (
            <LoadingSkeleton rows={6} />
          ) : paginatedUsers.length > 0 ? (
            <div className="space-y-4">
              <UserTable
                users={paginatedUsers}
                onView={(u) => setViewingUser(u)}
                onDelete={(u) => setDeletingUser(u)}
              />

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={filteredUsers.length}
                pageSize={pageSize}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          ) : (
            <EmptyState
              title="No users found"
              message="No registered customers match your current search or status filter."
              actionLabel="Reset Search"
              onAction={() => {
                setSearchQuery("");
                setStatusFilter("All");
              }}
            />
          )}
        </main>
      </div>

      <Modal isOpen={Boolean(viewingUser)} onClose={() => setViewingUser(null)} title="Customer Profile" maxWidth="max-w-xl">
        {viewingUser && <UserDetails user={viewingUser} onClose={() => setViewingUser(null)} />}
      </Modal>

      <ConfirmModal
        isOpen={Boolean(deletingUser)}
        onClose={() => setDeletingUser(null)}
        onConfirm={handleDeleteUser}
        title="Delete Customer"
        message={`Are you sure you want to delete ${deletingUser?.name}'s account?`}
        confirmText="Delete User"
      />
    </div>
  );
}
