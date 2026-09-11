import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { FiChevronRight, FiMail, FiLock, FiAlertCircle, FiArrowRight } from "react-icons/fi";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Newsletter from "../components/layout/Newsletter";
import { useAuth } from "../context/AuthContext";

const API_BASE_URL = "https://shop-co-e-commerce-coral.vercel.app";

function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const { login, isAuthenticated } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirect, { replace: true });
    }
  }, [isAuthenticated, navigate, redirect]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (apiError) {
      setApiError("");
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      setApiError("");

      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email.trim(),
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to log in. Please check your credentials.");
      }

      login(data.user, data.token);

      navigate(redirect, { replace: true });
    } catch (err) {
      setApiError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-8 lg:px-16">
        <nav className="mb-6 sm:mb-8 flex items-center gap-2 text-xs text-black/60 sm:text-sm">
          <Link to="/" className="hover:text-black transition-colors">
            Home
          </Link>
          <FiChevronRight size={14} className="text-black/40" />
          <span className="font-semibold text-black">Login</span>
        </nav>

        <div className="mx-auto max-w-md my-8 sm:my-12">
          <div className="rounded-[24px] border border-black/10 bg-white p-6 sm:p-10 shadow-sm">
            <div className="text-center mb-8">
              <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-black">
                Welcome Back
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-black/60">
                Log in to your SHOP.CO account to continue
              </p>
            </div>

            {apiError && (
              <div className="mb-6 rounded-xl bg-red-50 border border-red-200 p-4 text-xs sm:text-sm text-red-600 flex items-start gap-2.5">
                <FiAlertCircle size={18} className="shrink-0 mt-0.5" />
                <span>{apiError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-semibold text-black mb-1.5"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-black/40">
                    <FiMail size={16} />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className={`w-full rounded-xl bg-[#F0F0F0] py-3.5 pl-11 pr-4 text-sm text-black outline-none transition-all placeholder:text-black/40 ${
                      errors.email ? "ring-2 ring-red-500 bg-red-50/30" : "focus:ring-2 focus:ring-black"
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <FiAlertCircle size={12} /> {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold text-black mb-1.5"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-black/40">
                    <FiLock size={16} />
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className={`w-full rounded-xl bg-[#F0F0F0] py-3.5 pl-11 pr-4 text-sm text-black outline-none transition-all placeholder:text-black/40 ${
                      errors.password ? "ring-2 ring-red-500 bg-red-50/30" : "focus:ring-2 focus:ring-black"
                    }`}
                  />
                </div>
                {errors.password && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <FiAlertCircle size={12} /> {errors.password}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-black py-4 px-6 text-center text-sm sm:text-base font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50 cursor-pointer"
              >
                <span>{loading ? "Logging in..." : "Log In"}</span>
                {!loading && <FiArrowRight size={18} />}
              </button>
            </form>

            <div className="mt-6 text-center text-xs sm:text-sm text-black/60">
              Don't have an account?{" "}
              <Link
                to={redirect !== "/" ? `/signup?redirect=${encodeURIComponent(redirect)}` : "/signup"}
                className="font-semibold text-black underline hover:opacity-80 transition-opacity"
              >
                Sign up now
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Newsletter />
      <Footer />
    </div>
  );
}

export default Login;
