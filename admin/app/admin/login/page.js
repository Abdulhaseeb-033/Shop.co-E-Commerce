"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, Eye, EyeOff, ArrowRight, Sparkles } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("Demoadmin@gmail.com");
  const [password, setPassword] = useState("admin123");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    setTimeout(() => {
      if (
        email.toLowerCase() === "demoadmin@gmail.com" &&
        password === "admin123"
      ) {
        localStorage.setItem(
          "adminAuth",
          JSON.stringify({
            email: "Demoadmin@gmail.com",
            name: "Admin",
            role: "admin",
            loggedIn: true,
          })
        );
        router.push("/admin/dashboard");
      } else {
        setErrorMessage("Invalid credentials. Please use demo credentials.");
        setIsLoading(false);
      }
    }, 400);
  };

  const autoFillDemo = () => {
    setEmail("Demoadmin@gmail.com");
    setPassword("admin123");
    setErrorMessage("");
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col justify-center items-center p-4 sm:p-6">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-1.5">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-black text-white font-black text-xl shadow-xs mb-1">
            S
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
            SHOP.CO
          </h1>
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
            Admin Panel Login
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-gray-200 space-y-5">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Sign in to Dashboard</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Enter your credentials to access store controls.
            </p>
          </div>

          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-xl">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Mail size={16} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:outline-none focus:border-black focus:bg-white"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Lock size={16} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-9 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:outline-none focus:border-black focus:bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-black cursor-pointer"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 bg-black hover:bg-gray-800 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 mt-2"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>

          <div className="pt-3 border-t border-gray-100 text-center">
            <button
              type="button"
              onClick={autoFillDemo}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-black bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-lg border border-gray-200 transition-colors cursor-pointer"
            >
              <Sparkles size={13} className="text-amber-500" />
              <span>Auto-fill Demo Credentials</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
