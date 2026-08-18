import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiChevronRight,
  FiShoppingBag,
  FiCheckCircle,
  FiCreditCard,
  FiTruck,
  FiLock,
  FiAlertCircle,
} from "react-icons/fi";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Newsletter from "../components/layout/Newsletter";
import { useCart } from "../context/CartContext";

function Checkout() {
  const { cart, subtotal, discountTotal, deliveryFee, total, clearCart } =
    useCart();

  // Form State
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    postalCode: "",
    country: "United States",
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("card"); // 'card' | 'cod'
  const [errors, setErrors] = useState({});
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [placedOrderDetails, setPlacedOrderDetails] = useState(null);

  // Handle Form Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Auto-format card number with spaces (16 digits -> 4 groups of 4)
    if (name === "cardNumber") {
      const clean = value.replace(/\D/g, "").slice(0, 16);
      formattedValue = clean.replace(/(\d{4})(?=\d)/g, "$1 ");
    }

    // Auto-format expiry date (MM/YY)
    if (name === "expiryDate") {
      const clean = value.replace(/\D/g, "").slice(0, 4);
      if (clean.length >= 3) {
        formattedValue = `${clean.slice(0, 2)}/${clean.slice(2)}`;
      } else {
        formattedValue = clean;
      }
    }

    // Auto-format CVV (up to 4 digits)
    if (name === "cvv") {
      formattedValue = value.replace(/\D/g, "").slice(0, 4);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));

    // Clear error on change if fixed
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};

    // Contact
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s\-()]{7,20}$/.test(formData.phone.trim())) {
      newErrors.phone = "Please enter a valid phone number";
    }

    // Shipping
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.address.trim()) newErrors.address = "Street address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State / Province is required";
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = "Postal code is required";
    } else if (formData.postalCode.trim().length < 3) {
      newErrors.postalCode = "Please enter a valid postal code";
    }

    // Payment (if Card is selected)
    if (paymentMethod === "card") {
      if (!formData.cardName.trim()) {
        newErrors.cardName = "Cardholder name is required";
      }

      const cleanCard = formData.cardNumber.replace(/\s/g, "");
      if (!cleanCard) {
        newErrors.cardNumber = "Card number is required";
      } else if (cleanCard.length < 15 || cleanCard.length > 16) {
        newErrors.cardNumber = "Please enter a valid 16-digit card number";
      }

      if (!formData.expiryDate.trim()) {
        newErrors.expiryDate = "Expiry date is required";
      } else if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(formData.expiryDate.trim())) {
        newErrors.expiryDate = "Use MM/YY format";
      }

      if (!formData.cvv.trim()) {
        newErrors.cvv = "CVV is required";
      } else if (formData.cvv.trim().length < 3) {
        newErrors.cvv = "3 or 4 digits required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Order Placement
  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // Scroll to the first error
      const firstErrorKey = Object.keys(errors)[0];
      if (firstErrorKey) {
        const el = document.getElementById(firstErrorKey);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    // Generate simulated order confirmation details
    const orderId = `SHOP-${Math.floor(100000 + Math.random() * 900000)}`;
    const orderDetails = {
      orderId,
      items: [...cart],
      total,
      subtotal,
      discountTotal,
      deliveryFee,
      customer: { ...formData },
      date: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
    };

    setPlacedOrderDetails(orderDetails);
    setIsOrderPlaced(true);
    clearCart();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const discountPercent =
    subtotal > 0 ? Math.round((discountTotal / subtotal) * 100) : 0;

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-8 lg:px-16">
        {/* Breadcrumb */}
        <nav className="mb-6 sm:mb-8 flex items-center gap-2 text-xs text-black/60 sm:text-sm">
          <Link to="/" className="hover:text-black transition-colors">
            Home
          </Link>
          <FiChevronRight size={14} className="text-black/40" />
          <Link to="/cart" className="hover:text-black transition-colors">
            Cart
          </Link>
          <FiChevronRight size={14} className="text-black/40" />
          <span className="font-semibold text-black">Checkout</span>
        </nav>

        {/* ORDER SUCCESS STATE */}
        {isOrderPlaced && placedOrderDetails ? (
          <div className="mx-auto max-w-3xl my-8 sm:my-12">
            <div className="rounded-[24px] border border-black/10 bg-white p-6 sm:p-10 shadow-sm text-center">
              <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#01AB31]/10 text-[#01AB31]">
                <FiCheckCircle size={44} />
              </div>

              <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-black">
                Order Placed Successfully!
              </h1>
              <p className="mt-2 text-sm sm:text-base text-black/60">
                Thank you for your purchase. We have received your order and are preparing it for shipment.
              </p>

              <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#F0F0F0] px-5 py-2 text-xs sm:text-sm font-semibold text-black">
                <span>Order ID:</span>
                <span className="text-black">{placedOrderDetails.orderId}</span>
              </div>

              {/* Order Details Card */}
              <div className="mt-8 rounded-[16px] bg-[#F9F9F9] p-5 sm:p-6 text-left text-sm space-y-4">
                <div className="flex justify-between border-b border-black/10 pb-3">
                  <span className="text-black/60">Order Date</span>
                  <span className="font-semibold text-black">{placedOrderDetails.date}</span>
                </div>

                <div className="flex justify-between border-b border-black/10 pb-3">
                  <span className="text-black/60">Estimated Delivery</span>
                  <span className="font-semibold text-black">{placedOrderDetails.estimatedDelivery}</span>
                </div>

                <div className="flex justify-between border-b border-black/10 pb-3">
                  <span className="text-black/60">Delivering to</span>
                  <span className="font-semibold text-black text-right">
                    {placedOrderDetails.customer.firstName} {placedOrderDetails.customer.lastName}
                    <br />
                    <span className="text-xs text-black/60 font-normal">
                      {placedOrderDetails.customer.address}, {placedOrderDetails.customer.city}
                    </span>
                  </span>
                </div>

                <div className="flex justify-between pt-1 text-base">
                  <span className="font-bold text-black">Total Paid</span>
                  <span className="font-bold text-black text-lg">
                    ${placedOrderDetails.total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Action button */}
              <div className="mt-8">
                <Link
                  to="/shop"
                  className="inline-block rounded-full bg-black px-10 py-4 text-sm sm:text-base font-medium text-white transition-opacity hover:opacity-90"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        ) : cart.length === 0 ? (
          /* EMPTY CART STATE */
          <div className="rounded-[20px] border border-black/10 bg-white py-16 px-4 text-center my-6">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#F0F0F0] text-black/40">
              <FiShoppingBag size={36} />
            </div>
            <h2 className="text-2xl font-bold text-black mb-2">
              Your cart is empty
            </h2>
            <p className="text-black/60 max-w-md mx-auto mb-6 text-sm sm:text-base">
              You do not have any items in your cart to checkout. Explore our collections and add items to your cart.
            </p>
            <Link
              to="/shop"
              className="inline-block rounded-full bg-black px-8 py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          /* MAIN CHECKOUT LAYOUT */
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tight text-black sm:text-4xl lg:text-[40px] mb-6 sm:mb-8">
              CHECKOUT
            </h1>

            <form onSubmit={handlePlaceOrder} noValidate>
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10 items-start">
                {/* LEFT COLUMN: Customer, Shipping & Payment Information */}
                <div className="space-y-6 sm:space-y-8 lg:col-span-7">
                  {/* 1. Contact Information */}
                  <div className="rounded-[20px] border border-black/10 bg-white p-5 sm:p-7">
                    <h2 className="text-lg sm:text-xl font-bold text-black mb-4 sm:mb-5">
                      1. Contact Information
                    </h2>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-xs font-semibold text-black mb-1.5"
                        >
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="e.g. alex@example.com"
                          className={`w-full rounded-xl bg-[#F0F0F0] px-4 py-3 text-sm text-black outline-none transition-all placeholder:text-black/40 ${
                            errors.email ? "ring-2 ring-red-500 bg-red-50/30" : "focus:ring-2 focus:ring-black"
                          }`}
                        />
                        {errors.email && (
                          <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                            <FiAlertCircle size={12} /> {errors.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-xs font-semibold text-black mb-1.5"
                        >
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="e.g. +1 555 123 4567"
                          className={`w-full rounded-xl bg-[#F0F0F0] px-4 py-3 text-sm text-black outline-none transition-all placeholder:text-black/40 ${
                            errors.phone ? "ring-2 ring-red-500 bg-red-50/30" : "focus:ring-2 focus:ring-black"
                          }`}
                        />
                        {errors.phone && (
                          <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                            <FiAlertCircle size={12} /> {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* 2. Shipping Information */}
                  <div className="rounded-[20px] border border-black/10 bg-white p-5 sm:p-7">
                    <h2 className="text-lg sm:text-xl font-bold text-black mb-4 sm:mb-5">
                      2. Shipping Address
                    </h2>

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor="firstName"
                            className="block text-xs font-semibold text-black mb-1.5"
                          >
                            First Name *
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="John"
                            className={`w-full rounded-xl bg-[#F0F0F0] px-4 py-3 text-sm text-black outline-none transition-all placeholder:text-black/40 ${
                              errors.firstName ? "ring-2 ring-red-500 bg-red-50/30" : "focus:ring-2 focus:ring-black"
                            }`}
                          />
                          {errors.firstName && (
                            <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                              <FiAlertCircle size={12} /> {errors.firstName}
                            </p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="lastName"
                            className="block text-xs font-semibold text-black mb-1.5"
                          >
                            Last Name *
                          </label>
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Doe"
                            className={`w-full rounded-xl bg-[#F0F0F0] px-4 py-3 text-sm text-black outline-none transition-all placeholder:text-black/40 ${
                              errors.lastName ? "ring-2 ring-red-500 bg-red-50/30" : "focus:ring-2 focus:ring-black"
                            }`}
                          />
                          {errors.lastName && (
                            <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                              <FiAlertCircle size={12} /> {errors.lastName}
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="address"
                          className="block text-xs font-semibold text-black mb-1.5"
                        >
                          Street Address *
                        </label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          placeholder="123 Main Street"
                          className={`w-full rounded-xl bg-[#F0F0F0] px-4 py-3 text-sm text-black outline-none transition-all placeholder:text-black/40 ${
                            errors.address ? "ring-2 ring-red-500 bg-red-50/30" : "focus:ring-2 focus:ring-black"
                          }`}
                        />
                        {errors.address && (
                          <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                            <FiAlertCircle size={12} /> {errors.address}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="apartment"
                          className="block text-xs font-semibold text-black mb-1.5"
                        >
                          Apartment, Suite, Unit (Optional)
                        </label>
                        <input
                          type="text"
                          id="apartment"
                          name="apartment"
                          value={formData.apartment}
                          onChange={handleChange}
                          placeholder="Apt 4B"
                          className="w-full rounded-xl bg-[#F0F0F0] px-4 py-3 text-sm text-black outline-none transition-all placeholder:text-black/40 focus:ring-2 focus:ring-black"
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div>
                          <label
                            htmlFor="city"
                            className="block text-xs font-semibold text-black mb-1.5"
                          >
                            City *
                          </label>
                          <input
                            type="text"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder="New York"
                            className={`w-full rounded-xl bg-[#F0F0F0] px-4 py-3 text-sm text-black outline-none transition-all placeholder:text-black/40 ${
                              errors.city ? "ring-2 ring-red-500 bg-red-50/30" : "focus:ring-2 focus:ring-black"
                            }`}
                          />
                          {errors.city && (
                            <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                              <FiAlertCircle size={12} /> {errors.city}
                            </p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="state"
                            className="block text-xs font-semibold text-black mb-1.5"
                          >
                            State / Province *
                          </label>
                          <input
                            type="text"
                            id="state"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            placeholder="NY"
                            className={`w-full rounded-xl bg-[#F0F0F0] px-4 py-3 text-sm text-black outline-none transition-all placeholder:text-black/40 ${
                              errors.state ? "ring-2 ring-red-500 bg-red-50/30" : "focus:ring-2 focus:ring-black"
                            }`}
                          />
                          {errors.state && (
                            <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                              <FiAlertCircle size={12} /> {errors.state}
                            </p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="postalCode"
                            className="block text-xs font-semibold text-black mb-1.5"
                          >
                            Postal Code *
                          </label>
                          <input
                            type="text"
                            id="postalCode"
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleChange}
                            placeholder="10001"
                            className={`w-full rounded-xl bg-[#F0F0F0] px-4 py-3 text-sm text-black outline-none transition-all placeholder:text-black/40 ${
                              errors.postalCode ? "ring-2 ring-red-500 bg-red-50/30" : "focus:ring-2 focus:ring-black"
                            }`}
                          />
                          {errors.postalCode && (
                            <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                              <FiAlertCircle size={12} /> {errors.postalCode}
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="country"
                          className="block text-xs font-semibold text-black mb-1.5"
                        >
                          Country
                        </label>
                        <select
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          className="w-full rounded-xl bg-[#F0F0F0] px-4 py-3 text-sm text-black outline-none transition-all focus:ring-2 focus:ring-black cursor-pointer"
                        >
                          <option value="United States">United States</option>
                          <option value="Canada">Canada</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="Australia">Australia</option>
                          <option value="Germany">Germany</option>
                          <option value="France">France</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* 3. Payment Information (Demo) */}
                  <div className="rounded-[20px] border border-black/10 bg-white p-5 sm:p-7">
                    <div className="flex items-center justify-between mb-4 sm:mb-5">
                      <h2 className="text-lg sm:text-xl font-bold text-black">
                        3. Payment Method
                      </h2>
                      <div className="flex items-center gap-1.5 text-xs text-black/50">
                        <FiLock size={13} />
                        <span>Secure Checkout</span>
                      </div>
                    </div>

                    {/* Method Selector */}
                    <div className="grid grid-cols-2 gap-3 mb-5">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("card")}
                        className={`flex items-center justify-center gap-2 rounded-xl border p-3.5 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                          paymentMethod === "card"
                            ? "border-black bg-black text-white"
                            : "border-black/10 bg-white text-black/70 hover:bg-gray-50"
                        }`}
                      >
                        <FiCreditCard size={18} />
                        <span>Credit / Debit Card</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod("cod")}
                        className={`flex items-center justify-center gap-2 rounded-xl border p-3.5 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                          paymentMethod === "cod"
                            ? "border-black bg-black text-white"
                            : "border-black/10 bg-white text-black/70 hover:bg-gray-50"
                        }`}
                      >
                        <FiTruck size={18} />
                        <span>Cash on Delivery</span>
                      </button>
                    </div>

                    {paymentMethod === "card" ? (
                      <div className="space-y-4">
                        <div>
                          <label
                            htmlFor="cardName"
                            className="block text-xs font-semibold text-black mb-1.5"
                          >
                            Cardholder Name *
                          </label>
                          <input
                            type="text"
                            id="cardName"
                            name="cardName"
                            value={formData.cardName}
                            onChange={handleChange}
                            placeholder="Full name as shown on card"
                            className={`w-full rounded-xl bg-[#F0F0F0] px-4 py-3 text-sm text-black outline-none transition-all placeholder:text-black/40 ${
                              errors.cardName ? "ring-2 ring-red-500 bg-red-50/30" : "focus:ring-2 focus:ring-black"
                            }`}
                          />
                          {errors.cardName && (
                            <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                              <FiAlertCircle size={12} /> {errors.cardName}
                            </p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="cardNumber"
                            className="block text-xs font-semibold text-black mb-1.5"
                          >
                            Card Number *
                          </label>
                          <input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                            className={`w-full rounded-xl bg-[#F0F0F0] px-4 py-3 text-sm text-black outline-none transition-all placeholder:text-black/40 ${
                              errors.cardNumber ? "ring-2 ring-red-500 bg-red-50/30" : "focus:ring-2 focus:ring-black"
                            }`}
                          />
                          {errors.cardNumber && (
                            <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                              <FiAlertCircle size={12} /> {errors.cardNumber}
                            </p>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label
                              htmlFor="expiryDate"
                              className="block text-xs font-semibold text-black mb-1.5"
                            >
                              Expiry Date *
                            </label>
                            <input
                              type="text"
                              id="expiryDate"
                              name="expiryDate"
                              value={formData.expiryDate}
                              onChange={handleChange}
                              placeholder="MM/YY"
                              maxLength={5}
                              className={`w-full rounded-xl bg-[#F0F0F0] px-4 py-3 text-sm text-black outline-none transition-all placeholder:text-black/40 ${
                                errors.expiryDate ? "ring-2 ring-red-500 bg-red-50/30" : "focus:ring-2 focus:ring-black"
                              }`}
                            />
                            {errors.expiryDate && (
                              <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                                <FiAlertCircle size={12} /> {errors.expiryDate}
                              </p>
                            )}
                          </div>

                          <div>
                            <label
                              htmlFor="cvv"
                              className="block text-xs font-semibold text-black mb-1.5"
                            >
                              CVV *
                            </label>
                            <input
                              type="password"
                              id="cvv"
                              name="cvv"
                              value={formData.cvv}
                              onChange={handleChange}
                              placeholder="123"
                              maxLength={4}
                              className={`w-full rounded-xl bg-[#F0F0F0] px-4 py-3 text-sm text-black outline-none transition-all placeholder:text-black/40 ${
                                errors.cvv ? "ring-2 ring-red-500 bg-red-50/30" : "focus:ring-2 focus:ring-black"
                              }`}
                            />
                            {errors.cvv && (
                              <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                                <FiAlertCircle size={12} /> {errors.cvv}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="rounded-xl bg-[#F9F9F9] p-4 text-xs sm:text-sm text-black/70">
                        Pay with cash upon receiving your order at your doorstep. Please ensure you have the exact amount ready.
                      </div>
                    )}
                  </div>
                </div>

                {/* RIGHT COLUMN: Order Summary */}
                <div className="lg:col-span-5">
                  <div className="rounded-[20px] border border-black/10 bg-white p-5 sm:p-6 text-black sticky top-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-black mb-5">
                      Order Summary
                    </h2>

                    {/* Review Cart Items */}
                    <div className="max-h-[320px] overflow-y-auto divide-y divide-black/10 pr-1 mb-5 no-scrollbar">
                      {cart.map((item) => (
                        <div key={item.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                          <div className="h-14 w-14 sm:h-16 sm:w-16 shrink-0 overflow-hidden rounded-[12px] bg-[#F0EEED]">
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={item.name}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-[10px] text-gray-400">
                                No image
                              </div>
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs sm:text-sm font-bold text-black truncate">
                              {item.name}
                            </h4>
                            <p className="text-[11px] sm:text-xs text-black/60">
                              Size: {item.size} | Color: {item.color}
                            </p>
                            <p className="text-[11px] sm:text-xs text-black/60">
                              Qty: {item.quantity} × ${item.discountedPrice?.toFixed(2) || item.price.toFixed(2)}
                            </p>
                          </div>

                          <span className="text-xs sm:text-sm font-bold text-black shrink-0">
                            ${((item.discountedPrice || item.price) * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Breakdown */}
                    <div className="space-y-3.5 border-t border-black/10 pt-4 text-xs sm:text-sm">
                      <div className="flex justify-between text-black/60">
                        <span>Subtotal</span>
                        <span className="font-bold text-black">${subtotal.toFixed(2)}</span>
                      </div>

                      <div className="flex justify-between text-black/60">
                        <span>Discount ({discountPercent > 0 ? `-${discountPercent}%` : "-0%"})</span>
                        <span className="font-bold text-[#FF3333]">
                          -${discountTotal.toFixed(2)}
                        </span>
                      </div>

                      <div className="flex justify-between text-black/60">
                        <span>Delivery Fee</span>
                        <span className="font-bold text-black">${deliveryFee.toFixed(2)}</span>
                      </div>

                      <div className="border-t border-black/10 pt-3 flex justify-between text-sm sm:text-base">
                        <span className="font-normal text-black">Total</span>
                        <span className="text-lg sm:text-xl font-bold text-black">
                          ${total.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Place Order Primary Action Button */}
                    <button
                      type="submit"
                      className="mt-6 w-full rounded-full bg-black py-4 px-6 text-center text-sm sm:text-base font-medium text-white transition-opacity hover:opacity-90 cursor-pointer"
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}
      </main>

      <Newsletter />
      <Footer />
    </div>
  );
}

export default Checkout;