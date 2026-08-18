import { Link } from "react-router-dom";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

function ProductCard({ product }) {
  if (!product) return null;

  const productId = product._id || product.id;
  const imageUrl = product.images?.[0] || product.image?.[0] || "";
  const discountedPrice =
    product.discount > 0
      ? product.price - (product.price * product.discount) / 100
      : product.price;

  const rating = product.rating || 0;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <Link
      to={`/product/${productId}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="group block w-full shrink-0"
    >
      <article className="w-full">
      <div className="aspect-[1/1] sm:aspect-[3/4] overflow-hidden rounded-[20px] bg-[#F0EEED]">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-gray-400 text-xs sm:text-sm">
            No image
          </div>
        )}
      </div>

      <div className="pt-3 sm:pt-4">
        <h3 className="line-clamp-1 text-base font-bold text-black sm:text-lg">
          {product.name}
        </h3>

        <div className="mt-1 flex items-center gap-1.5 text-sm">
          <div className="flex items-center text-[#FFC700]">
            {[...Array(5)].map((_, i) => {
              if (i < fullStars) {
                return <FaStar key={i} size={14} />;
              } else if (i === fullStars && hasHalfStar) {
                return <FaStarHalfAlt key={i} size={14} />;
              } else {
                return <FaStar key={i} size={14} className="text-gray-200" />;
              }
            })}
          </div>

          <span className="text-xs text-black/70 font-normal sm:text-sm">
            {rating.toFixed(1)}/5
          </span>
        </div>

        <div className="mt-2 flex items-center gap-2 sm:gap-3">
          <span className="text-lg font-bold text-black sm:text-2xl">
            ${discountedPrice.toFixed(2)}
          </span>

          {product.discount > 0 && (
            <>
              <span className="text-base font-bold text-black/40 line-through sm:text-2xl">
                ${product.price.toFixed(2)}
              </span>

              <span className="rounded-full bg-[#FF3333]/10 px-2 py-0.5 text-xs font-semibold text-[#FF3333] sm:px-3 sm:py-1">
                -{product.discount}%
              </span>
            </>
          )}
        </div>
      </div>
    </article>
  </Link>
  );
}

export default ProductCard;
