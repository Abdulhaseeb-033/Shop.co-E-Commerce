import { useState } from "react";
import {
  FiMenu,
  FiSearch,
  FiShoppingCart,
  FiUser,
  FiX,
  FiChevronDown,
  FiLogOut,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const shopCategories = [
    "T-Shirts",
    "Shirts",
    "Jeans",
    "Shorts",
    "Hoodies",
  ];

  return (
    <header className="w-full bg-white text-black">

      <div className="relative bg-black px-4 py-2 text-center text-xs text-white sm:text-sm">
        {!isAuthenticated ? (
          <p>
            Sign up and get 20% off your first order.{" "}
            <Link to="/signup" className="cursor-pointer underline">
              Sign Up Now
            </Link>
          </p>
        ) : (
          <p>
            Welcome to SHOP.CO! Enjoy the best fashion deals and new arrivals.
          </p>
        )}

        <button
          type="button"
          className="absolute right-4 top-1/2 hidden -translate-y-1/2 sm:block"
          aria-label="Close announcement"
        >
          <FiX size={15} />
        </button>
      </div>

      <nav className="relative border-b border-gray-100">

        <div className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:h-20 lg:px-8">

          <div className="flex items-center gap-5 lg:gap-0">

            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              className="shrink-0 lg:hidden"
              aria-label="Open menu"
            >
              <FiMenu size={24} />
            </button>

            <Link
              to="/"
              className="shrink-0 text-2xl font-black tracking-[-1.5px] sm:text-3xl"
            >
              SHOP.CO
            </Link>
          </div>

          <div className="hidden items-center gap-8 lg:ml-15 lg:flex">

            <div
              className="relative"
              onMouseEnter={() => setIsShopOpen(true)}
              onMouseLeave={() => setIsShopOpen(false)}
            >
              <button
                type="button"
                className="flex items-center gap-1 text-sm transition-opacity hover:opacity-60"
              >
                Shop
                <FiChevronDown size={14} />
              </button>

              <AnimatePresence>
                {isShopOpen && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: -8,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -8,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                    className="absolute left-0 top-full z-40 w-48 rounded-xl border border-gray-100 bg-white p-2 shadow-lg"
                  >
                    {shopCategories.map((category) => (
                      <Link
                        key={category}
                        to={`/shop?category=${encodeURIComponent(category)}`}
                        className="block rounded-lg px-4 py-3 text-sm transition-colors hover:bg-gray-100"
                      >
                        {category}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              to="/shop"
              className="text-sm transition-opacity hover:opacity-60"
            >
              On Sale
            </Link>

            <Link
              to="/shop"
              className="text-sm transition-opacity hover:opacity-60"
            >
              New Arrivals
            </Link>

            <Link
              to="/shop"
              className="text-sm transition-opacity hover:opacity-60"
            >
              Brands
            </Link>
          </div>

          <div className="hidden flex-1 lg:ml-25 lg:block lg:max-w-lg">
            <div className="flex items-center gap-3 rounded-full bg-[#f2f2f2] px-4 py-2">
              <FiSearch
                size={20}
                className="shrink-0 text-gray-500"
              />

              <input
                type="text"
                placeholder="Search for products..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-gray-500"
              />
            </div>
          </div>

          <div className="ml-auto flex shrink-0 items-center gap-3 sm:gap-4 lg:ml-15">

            <button
              type="button"
              onClick={() => setIsSearchOpen((prev) => !prev)}
              className="lg:hidden"
              aria-label="Search"
            >
              {isSearchOpen ? (
                <FiX size={22} />
              ) : (
                <FiSearch size={22} />
              )}
            </button>

            <div className="relative">
              <Link
                to="/cart"
                aria-label="Shopping cart"
                className="relative block"
              >
                <FiShoppingCart size={22} />

                {cartCount > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-black px-1 text-[10px] font-medium text-white">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>

            {!isAuthenticated || !user ? (
              <Link
                to="/login"
                className="block text-black hover:opacity-70 transition-opacity"
                aria-label="Account Login"
              >
                <FiUser size={22} />
              </Link>
            ) : (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen((prev) => !prev)}
                  className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-black text-xs sm:text-sm font-bold text-white transition-opacity hover:opacity-90 cursor-pointer shadow-sm"
                  aria-label="Account Profile"
                >
                  {user.name ? user.name.trim().charAt(0).toUpperCase() : "U"}
                </button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-30"
                        onClick={() => setIsUserMenuOpen(false)}
                      />
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-2 z-40 w-56 rounded-2xl border border-black/10 bg-white p-3 shadow-xl"
                      >
                        <div className="border-b border-black/10 px-3 py-2.5 mb-2">
                          <p className="text-xs font-semibold text-black truncate">{user.name}</p>
                          <p className="text-[11px] text-black/60 truncate">{user.email}</p>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            logout();
                          }}
                          className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                        >
                          <FiLogOut size={15} />
                          <span>Log Out</span>
                        </button>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>

        <AnimatePresence>
          {isSearchOpen && (
            <>
              <motion.div
                initial={{
                  height: 0,
                  opacity: 0,
                }}
                animate={{
                  height: "auto",
                  opacity: 1,
                }}
                exit={{
                  height: 0,
                  opacity: 0,
                }}
                transition={{
                  duration: 0.25,
                }}
                className="overflow-hidden border-t bg-white lg:hidden"
              >
                <div className="px-4 py-3 sm:px-6">
                  <div className="flex items-center gap-3 rounded-full bg-[#f2f2f2] px-4 py-3">
                    <FiSearch
                      size={20}
                      className="shrink-0 text-gray-500"
                    />

                    <input
                      autoFocus
                      type="text"
                      placeholder="Search for products..."
                      className="w-full bg-transparent text-sm outline-none placeholder:text-gray-500"
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                transition={{
                  duration: 0.2,
                }}
                onClick={() => setIsSearchOpen(false)}
                className="fixed inset-0 top-[104px] z-30 bg-black/20 lg:hidden"
              />
            </>
          )}
        </AnimatePresence>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 0.25,
              }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            />

            <motion.div
              initial={{
                x: "100%",
              }}
              animate={{
                x: 0,
              }}
              exit={{
                x: "100%",
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              className="fixed right-0 top-0 z-50 h-full w-[82%] max-w-sm bg-white lg:hidden"
            >

              <div className="flex h-16 items-center justify-between border-b px-5">
                <Link
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-2xl font-black tracking-[-1.5px]"
                >
                  SHOP.CO
                </Link>

                <button
                  type="button"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <FiX size={25} />
                </button>
              </div>

              <div className="flex flex-col px-6 py-6">

                <Link
                  to="/shop"
                  onClick={() => setIsMenuOpen(false)}
                  className="border-b py-5 text-lg font-medium"
                >
                  Shop
                </Link>

                <Link
                  to="/shop"
                  onClick={() => setIsMenuOpen(false)}
                  className="border-b py-5 text-lg font-medium"
                >
                  On Sale
                </Link>

                <Link
                  to="/shop"
                  onClick={() => setIsMenuOpen(false)}
                  className="border-b py-5 text-lg font-medium"
                >
                  New Arrivals
                </Link>

                <Link
                  to="/shop"
                  onClick={() => setIsMenuOpen(false)}
                  className="border-b py-5 text-lg font-medium"
                >
                  Brands
                </Link>

                {/* Mobile Auth Actions */}
                {isAuthenticated && user ? (
                  <div className="pt-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-sm font-bold text-white">
                        {user.name ? user.name.trim().charAt(0).toUpperCase() : "U"}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold text-black truncate">{user.name}</p>
                        <p className="text-xs text-black/60 truncate">{user.email}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setIsMenuOpen(false);
                        logout();
                      }}
                      className="flex w-full items-center justify-center gap-2 rounded-full bg-red-50 py-3.5 text-sm font-medium text-red-600 hover:bg-red-100 transition-colors"
                    >
                      <FiLogOut size={16} />
                      <span>Log Out</span>
                    </button>
                  </div>
                ) : (
                  <div className="pt-6 space-y-3">
                    <Link
                      to="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="block rounded-full bg-black py-3.5 text-center text-sm font-medium text-white hover:opacity-90"
                    >
                      Log In
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setIsMenuOpen(false)}
                      className="block rounded-full border border-black/10 py-3.5 text-center text-sm font-medium text-black hover:bg-gray-50"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </header>
  );
};

export default Header;