"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  ClipboardList,
  LogOut,
  X,
  Store,
} from "lucide-react";

export default function Sidebar({ isOpen = false, onClose }) {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Products", href: "/admin/dashboard/products", icon: ShoppingBag },
    { label: "Users", href: "/admin/dashboard/users", icon: Users },
    { label: "Orders", href: "/admin/dashboard/orders", icon: ClipboardList },
  ];

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    if (onClose) onClose();
    router.push("/admin/login");
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-xs transition-opacity"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-gray-200/80 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        <div>
          <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100">
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-2"
              onClick={onClose}
            >
              <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center font-black text-sm">
                S
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg tracking-tight text-black leading-none">
                  SHOP.CO
                </span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">
                  Admin Panel
                </span>
              </div>
            </Link>

            <button
              onClick={onClose}
              className="p-1 rounded-lg text-gray-400 hover:text-black hover:bg-gray-100 lg:hidden cursor-pointer"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>

          <nav className="p-4 space-y-1">
            <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2">
              Menu
            </p>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/admin/dashboard"
                  ? pathname === "/admin/dashboard"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-black text-white shadow-xs"
                      : "text-gray-600 hover:text-black hover:bg-gray-100"
                  }`}
                >
                  <Icon size={17} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-gray-100 space-y-2">
          <div className="p-3 bg-gray-50 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-semibold text-gray-800">Store Live</span>
            </div>
            <Store size={15} className="text-gray-400" />
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
          >
            <LogOut size={17} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
