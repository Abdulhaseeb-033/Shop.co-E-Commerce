"use client";

import { useState } from "react";
import { Search, Bell, Menu } from "lucide-react";
import ProfileDropdown from "./ProfileDropdown";

export default function Header({
  onMenuClick,
  searchValue = "",
  onSearchChange,
  placeholder = "Search...",
}) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-gray-200/80 bg-white/95 backdrop-blur-xs px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3 sm:gap-4 flex-1 max-w-md">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-xl text-gray-600 hover:bg-gray-100 lg:hidden cursor-pointer"
          aria-label="Toggle menu"
        >
          <Menu size={20} />
        </button>

        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <Search size={16} />
          </div>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            placeholder={placeholder}
            className="w-full pl-9 pr-3 py-1.5 bg-gray-50 hover:bg-gray-100/70 focus:bg-white text-xs sm:text-sm text-gray-900 placeholder-gray-400 rounded-xl border border-transparent focus:border-gray-300 focus:outline-none transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => alert("Notification: Store is running and connected to live backend APIs.")}
          className="relative p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
          aria-label="Notifications"
        >
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-black"></span>
        </button>

        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="w-9 h-9 rounded-full bg-black text-white font-bold text-sm flex items-center justify-center hover:ring-4 hover:ring-gray-100 transition-all cursor-pointer shadow-xs"
            aria-label="Admin Profile"
          >
            A
          </button>

          <ProfileDropdown
            isOpen={isProfileOpen}
            onClose={() => setIsProfileOpen(false)}
          />
        </div>
      </div>
    </header>
  );
}
