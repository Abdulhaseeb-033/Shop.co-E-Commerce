import { Link } from "react-router-dom";
import { FiChevronRight, FiShoppingBag } from "react-icons/fi";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Newsletter from "../components/layout/Newsletter";
import CartItem from "../components/cart/CartItem";
import OrderSummary from "../components/cart/OrderSummary";
import { useCart } from "../context/CartContext";

function Cart() {
  const { cart } = useCart();

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-8 lg:px-16">
        {/* Breadcrumb Navigation */}
        <nav className="mb-6 sm:mb-8 flex items-center gap-2 text-xs text-black/60 sm:text-sm">
          <Link to="/" className="hover:text-black transition-colors">
            Home
          </Link>
          <FiChevronRight size={14} className="text-black/40" />
          <span className="font-semibold text-black">Cart</span>
        </nav>

        {/* Page Title */}
        <h1 className="text-3xl font-black uppercase tracking-tight text-black sm:text-4xl lg:text-[40px] mb-6 sm:mb-8">
          YOUR CART
        </h1>

        {cart.length === 0 ? (
          /* Empty Cart State */
          <div className="rounded-[20px] border border-black/10 bg-white py-16 px-4 text-center my-6">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#F0F0F0] text-black/40">
              <FiShoppingBag size={36} />
            </div>
            <h2 className="text-2xl font-bold text-black mb-2">
              Your cart is empty
            </h2>
            <p className="text-black/60 max-w-md mx-auto mb-6 text-sm sm:text-base">
              Looks like you haven't added anything to your cart yet. Explore our latest collection and find something you love.
            </p>
            <Link
              to="/shop"
              className="inline-block rounded-full bg-black px-8 py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          /* Cart Main Layout */
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8 items-start">
            {/* Cart Items List */}
            <div className="rounded-[20px] border border-black/10 bg-white p-4 sm:p-6 divide-y divide-black/10 lg:col-span-7">
              {cart.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-5">
              <OrderSummary />
            </div>
          </div>
        )}
      </main>

      <Newsletter />
      <Footer />
    </div>
  );
}

export default Cart;