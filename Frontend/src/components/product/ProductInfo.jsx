import { useState, useEffect } from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { FiCheck, FiMinus, FiPlus, FiCheckCircle } from "react-icons/fi";
import { useCart } from "../../context/CartContext";

const COLOR_MAP = {
  black: "#000000",
  charcoal: "#36454F",
  navy: "#000080",
  "navy blue": "#00008B",
  "slate gray": "#708090",
  olive: "#808000",
  "olive green": "#556B2F",
  "sage green": "#8A9A86",
  khaki: "#C3B091",
  beige: "#F5F5DC",
  "charcoal grey": "#4A5459",
  white: "#FFFFFF",
  "blue/olive": "#1F4E5B",
  "charcoal green": "#2E4036",
  "teal blue": "#008080",
  grey: "#808080",
  gray: "#808080",
  "medium blue": "#0000CD",
  brown: "#8B4513",
  red: "#DC2626",
  green: "#16A34A",
  blue: "#2563EB",
};

const getColorHex = (colorName = "") => {
  const normalized = colorName.toLowerCase().trim();
  return COLOR_MAP[normalized] || colorName || "#000000";
};

function ProductInfo({ product }) {
  const { addToCart } = useCart();

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  // Sync initial color and size when product loads or changes
  useEffect(() => {
    if (product) {
      if (product.colors && product.colors.length > 0) {
        setSelectedColor(product.colors[0]);
      } else {
        setSelectedColor("Default");
      }

      if (product.sizes && product.sizes.length > 0) {
        setSelectedSize(product.sizes[0]);
      } else {
        setSelectedSize("Standard");
      }

      setQuantity(1);
    }
  }, [product]);

  if (!product) return null;

  const rating = product.rating || 0;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  const discountedPrice =
    product.discount > 0
      ? product.price - (product.price * product.discount) / 100
      : product.price;

  const handleDecreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleIncreaseQuantity = () => {
    const maxStock = product.stock || 99;
    setQuantity((prev) => (prev < maxStock ? prev + 1 : prev));
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <div className="w-full text-black">
      {/* Product Title */}
      <h1 className="text-2xl font-black uppercase tracking-tight text-black sm:text-3xl lg:text-[40px] leading-tight">
        {product.name}
      </h1>

      {/* Rating */}
      <div className="mt-2.5 sm:mt-3 flex items-center gap-2 text-sm sm:text-base">
        <div className="flex items-center text-[#FFC700]">
          {[...Array(5)].map((_, i) => {
            if (i < fullStars) {
              return <FaStar key={i} size={18} />;
            } else if (i === fullStars && hasHalfStar) {
              return <FaStarHalfAlt key={i} size={18} />;
            } else {
              return <FaStar key={i} size={18} className="text-gray-200" />;
            }
          })}
        </div>

        <span className="text-xs sm:text-sm text-black/70 font-normal">
          {rating.toFixed(1)}/5
        </span>
      </div>

      {/* Price section */}
      <div className="mt-3 sm:mt-3.5 flex items-center gap-3 sm:gap-3.5">
        <span className="text-2xl font-bold text-black sm:text-3xl lg:text-[32px]">
          ${discountedPrice.toFixed(2)}
        </span>

        {product.discount > 0 && (
          <>
            <span className="text-2xl font-bold text-black/40 line-through sm:text-3xl lg:text-[32px]">
              ${product.price.toFixed(2)}
            </span>

            <span className="rounded-full bg-[#FF3333]/10 px-3.5 py-1 text-xs sm:text-sm font-semibold text-[#FF3333]">
              -{product.discount}%
            </span>
          </>
        )}
      </div>

      <div className="my-4 sm:my-5 border-t border-black/10" />

      {/* Short Description */}
      <p className="text-sm text-black/60 leading-relaxed sm:text-base">
        {product.shortDescription}
      </p>

      {/* Colors Section */}
      {product.colors && product.colors.length > 0 && (
        <>
          <div className="my-4 sm:my-5 border-t border-black/10" />

          <div>
            <p className="mb-3 text-xs sm:text-sm text-black/60">Select Colors</p>
            <div className="flex flex-wrap gap-3">
              {product.colors.map((color) => {
                const isSelected = selectedColor === color;
                const hex = getColorHex(color);
                const isLight =
                  color.toLowerCase() === "white" ||
                  color.toLowerCase() === "beige";

                return (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    style={{ backgroundColor: hex }}
                    className={`relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full transition-transform hover:scale-105 ${
                      isLight ? "border border-black/20" : ""
                    }`}
                    title={color}
                    aria-label={`Select color ${color}`}
                  >
                    {isSelected && (
                      <FiCheck
                        size={18}
                        className={isLight ? "text-black" : "text-white"}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* Sizes Section */}
      {product.sizes && product.sizes.length > 0 && (
        <>
          <div className="my-4 sm:my-5 border-t border-black/10" />

          <div>
            <p className="mb-3 text-xs sm:text-sm text-black/60">Choose Size</p>
            <div className="flex flex-wrap gap-2.5 sm:gap-3">
              {product.sizes.map((size) => {
                const isSelected = selectedSize === size;
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`rounded-full px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-medium transition-all ${
                      isSelected
                        ? "bg-black text-white"
                        : "bg-[#F0F0F0] text-black/60 hover:bg-gray-200"
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}

      <div className="my-5 sm:my-6 border-t border-black/10" />

      {/* Quantity & Add to Cart Action Row */}
      <div className="flex items-center gap-3 sm:gap-5">
        {/* Quantity Selector */}
        <div className="flex items-center justify-between rounded-full bg-[#F0F0F0] px-4 py-3 sm:px-5 sm:py-3.5 w-[110px] sm:w-[150px] shrink-0">
          <button
            type="button"
            onClick={handleDecreaseQuantity}
            disabled={quantity <= 1}
            className="text-black transition-opacity hover:opacity-60 disabled:opacity-30 cursor-pointer"
            aria-label="Decrease quantity"
          >
            <FiMinus size={18} />
          </button>

          <span className="text-sm sm:text-base font-semibold text-black">
            {quantity}
          </span>

          <button
            type="button"
            onClick={handleIncreaseQuantity}
            disabled={product.stock ? quantity >= product.stock : false}
            className="text-black transition-opacity hover:opacity-60 disabled:opacity-30 cursor-pointer"
            aria-label="Increase quantity"
          >
            <FiPlus size={18} />
          </button>
        </div>

        {/* Add to Cart Button */}
        <button
          type="button"
          onClick={handleAddToCart}
          className={`flex-1 rounded-full py-3.5 sm:py-4 px-6 text-sm sm:text-base font-medium text-white transition-all flex items-center justify-center gap-2 cursor-pointer ${
            isAdded
              ? "bg-[#01AB31] text-white"
              : "bg-black hover:bg-black/90 active:scale-[0.99]"
          }`}
        >
          {isAdded ? (
            <>
              <FiCheckCircle size={18} />
              <span>Added to Cart!</span>
            </>
          ) : (
            <span>Add to Cart</span>
          )}
        </button>
      </div>
    </div>
  );
}

export default ProductInfo;
