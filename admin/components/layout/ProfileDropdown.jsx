"use client";

import { useEffect, useRef } from "react";
import { User, LogOut, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfileDropdown({ isOpen, onClose }) {
  const ref = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose();
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    onClose();
    router.push("/admin/login");
  };

  return (
    <div
      ref={ref}
      className="absolute right-0 top-full mt-2 w-64 rounded-2xl bg-white shadow-xl border border-gray-100 py-2 z-50 animate-fade-in divide-y divide-gray-100 text-sm"
    >
      <div className="p-3.5 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-black text-white font-bold text-sm flex items-center justify-center shrink-0">
          A
        </div>
        <div className="overflow-hidden">
          <p className="font-bold text-gray-900 text-xs sm:text-sm">Admin</p>
          <p className="text-[11px] text-gray-400 truncate">demo@shopco.com</p>
        </div>
      </div>

      <div className="p-1.5 space-y-1">
        <button
          onClick={() => {
            alert("Admin Role: Super Administrator\nEmail: demo@shopco.com\nStore: SHOP.CO");
            onClose();
          }}
          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-100 rounded-xl transition-colors text-left cursor-pointer"
        >
          <User size={15} className="text-gray-400" />
          <span>Profile</span>
        </button>

        <div className="px-3 py-1 text-[11px] text-gray-400 flex items-center gap-1.5">
          <ShieldCheck size={13} className="text-emerald-500" />
          <span>Role: Store Administrator</span>
        </div>
      </div>
      
      <div className="p-1.5">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors text-left cursor-pointer"
        >
          <LogOut size={15} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
