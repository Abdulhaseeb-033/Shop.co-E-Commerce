import { Link } from "react-router-dom";
import { FiTrash2, FiMinus, FiPlus } from "react-icons/fi";
import { useCart } from "../../context/CartContext";

function CartItem({ item }) {
  const { removeFromCart, updateQuantity } = useCart();

  if (!item) return null;

  const unitPrice =
    item.discountedPrice !== undefined
      ? item.discountedPrice
      : item.discount > 0
      ? item.price - (item.price * item.discount) / 100
      : item.price;

  return (
    <div className="flex gap-3.5 sm:gap-4 py-4 sm:py-6 first:pt-0 last:pb-0 items-center">
      {/* Product Image */}
      <Link
        to={`/product/${item.productId}`}
        className="h-[100px] w-[100px] sm:h-[124px] sm:w-[124px] shrink-0 overflow-hidden rounded-[16px] bg-[#F0EEED]"
      >
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover object-center"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
            No image
          </div>
        )}
      </Link>

      {/* Item Details */}
      <div className="flex flex-1 flex-col justify-between self-stretch">
        <div>
          {/* Title & Delete button */}
          <div className="flex items-start justify-between gap-2">
            <Link
              to={`/product/${item.productId}`}
              className="line-clamp-1 text-base font-bold text-black hover:underline sm:text-xl"
            >
              {item.name}
            </Link>

            <button
              type="button"
              onClick={() => removeFromCart(item.id)}
              className="text-[#FF3333] transition-opacity hover:opacity-70 p-1 cursor-pointer"
              aria-label="Remove item"
            >
              <FiTrash2 size={20} />
            </button>
          </div>

          {/* Size & Color Attributes */}
          <div className="mt-1 space-y-0.5 text-xs sm:text-sm text-black">
            {item.size && (
              <p>
                <span className="font-normal text-black">Size: </span>
                <span className="text-black/60">{item.size}</span>
              </p>
            )}
            {item.color && (
              <p>
                <span className="font-normal text-black">Color: </span>
                <span className="text-black/60">{item.color}</span>
              </p>
            )}
          </div>
        </div>

        {/* Price & Quantity Selector */}
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold text-black sm:text-2xl">
            ${unitPrice.toFixed(2)}
          </span>

          <div className="flex items-center justify-between rounded-full bg-[#F0F0F0] px-3.5 py-1.5 sm:px-4 sm:py-2 gap-3 sm:gap-5">
            <button
              type="button"
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
              className="text-black transition-opacity hover:opacity-60 disabled:opacity-30 cursor-pointer"
              aria-label="Decrease quantity"
            >
              <FiMinus size={15} />
            </button>

            <span className="text-xs sm:text-sm font-semibold text-black min-w-[12px] text-center">
              {item.quantity}
            </span>

            <button
              type="button"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="text-black transition-opacity hover:opacity-60 cursor-pointer"
              aria-label="Increase quantity"
            >
              <FiPlus size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
