import { useState } from "react";
import { Link } from "react-router-dom";
import { FiTag, FiArrowRight } from "react-icons/fi";
import { useCart } from "../../context/CartContext";

function OrderSummary() {
  const { subtotal, discountTotal, deliveryFee, total, cart } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(false);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().length > 0) {
      setAppliedPromo(true);
    }
  };

  const discountPercent =
    subtotal > 0 ? Math.round((discountTotal / subtotal) * 100) : 0;

  return (
    <aside className="rounded-[20px] border border-black/10 bg-white p-5 sm:p-6 text-black h-fit">
      <h2 className="text-xl sm:text-2xl font-bold text-black mb-5 sm:mb-6">
        Order Summary
      </h2>

      {/* Summary lines */}
      <div className="space-y-4 text-sm sm:text-base">
        {/* Subtotal */}
        <div className="flex items-center justify-between text-black/60">
          <span>Subtotal</span>
          <span className="font-bold text-black">${subtotal.toFixed(2)}</span>
        </div>

        {/* Discount */}
        <div className="flex items-center justify-between text-black/60">
          <span>Discount ({discountPercent > 0 ? `-${discountPercent}%` : "-0%"})</span>
          <span className="font-bold text-[#FF3333]">
            -${discountTotal.toFixed(2)}
          </span>
        </div>

        {/* Delivery Fee */}
        <div className="flex items-center justify-between text-black/60">
          <span>Delivery Fee</span>
          <span className="font-bold text-black">${deliveryFee.toFixed(2)}</span>
        </div>

        <div className="border-t border-black/10 pt-4">
          <div className="flex items-center justify-between text-base sm:text-lg">
            <span className="font-normal text-black">Total</span>
            <span className="text-xl sm:text-2xl font-bold text-black">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Promo Code Input */}
      <form onSubmit={handleApplyPromo} className="mt-6 flex items-center gap-3">
        <div className="flex flex-1 items-center gap-2.5 rounded-full bg-[#F0F0F0] px-4 py-3 text-sm">
          <FiTag size={18} className="text-black/40 shrink-0" />
          <input
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            placeholder="Add promo code"
            className="w-full bg-transparent text-black outline-none placeholder:text-black/40"
          />
        </div>

        <button
          type="submit"
          disabled={!promoCode.trim()}
          className="rounded-full bg-black px-6 sm:px-8 py-3 text-xs sm:text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-40 cursor-pointer"
        >
          Apply
        </button>
      </form>

      {appliedPromo && (
        <p className="mt-2 text-xs text-[#01AB31] font-medium">
          Promo code "{promoCode}" applied!
        </p>
      )}

      {/* Go to Checkout Button */}
      <Link
        to="/checkout"
        className={`mt-5 sm:mt-6 flex w-full items-center justify-center gap-3 rounded-full bg-black py-4 px-6 text-center text-sm sm:text-base font-medium text-white transition-opacity hover:opacity-90 ${
          cart.length === 0 ? "pointer-events-none opacity-50" : ""
        }`}
      >
        <span>Go to Checkout</span>
        <FiArrowRight size={18} />
      </Link>
    </aside>
  );
}

export default OrderSummary;
