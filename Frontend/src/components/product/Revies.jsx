import { useState, useEffect, useMemo } from "react";
import { FaStar, FaCheckCircle } from "react-icons/fa";
import { FiSliders, FiMoreHorizontal, FiChevronDown } from "react-icons/fi";

function Revies({ product }) {
  const [isMobile, setIsMobile] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [sortBy, setSortBy] = useState("latest");

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const rawReviews = product?.reviews || [];

  // Sort reviews
  const sortedReviews = useMemo(() => {
    const list = [...rawReviews];
    if (sortBy === "highest") {
      list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === "lowest") {
      list.sort((a, b) => (a.rating || 0) - (b.rating || 0));
    } else if (sortBy === "oldest") {
      list.sort((a, b) => new Date(a.date || 0) - new Date(b.date || 0));
    } else {
      // Default latest
      list.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
    }
    return list;
  }, [rawReviews, sortBy]);

  const totalReviewsCount = sortedReviews.length;

  // Determine initial display limit: 6 on desktop, 3 on mobile
  const initialLimit = isMobile ? 3 : 6;

  // Displayed reviews based on showAll toggle
  const displayedReviews = showAll
    ? sortedReviews
    : sortedReviews.slice(0, initialLimit);

  // View All button appears ONLY when total reviews > 6
  const hasMoreThanSix = totalReviewsCount > 6;

  // Format date helper
  const formatReviewDate = (dateVal) => {
    if (!dateVal) return "Recently";
    try {
      const d = new Date(dateVal);
      return d.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return "Recently";
    }
  };

  return (
    <div className="w-full text-black">
      {/* Reviews Header Bar */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <h3 className="text-xl sm:text-2xl font-bold text-black">
            All Reviews
          </h3>
          <span className="text-sm sm:text-base text-black/60 font-normal">
            ({totalReviewsCount})
          </span>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3 ml-auto">
          {/* Mobile Filter Button */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="cursor-pointer rounded-full bg-[#F0F0F0] px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-medium text-black outline-none"
            >
              <option value="latest">Latest</option>
              <option value="highest">Highest Rating</option>
              <option value="lowest">Lowest Rating</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>

          <button
            type="button"
            className="rounded-full bg-black px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Write a Review
          </button>
        </div>
      </div>

      {/* Reviews Grid */}
      {totalReviewsCount === 0 ? (
        <div className="py-12 text-center text-black/50 font-medium">
          No reviews yet for this product. Be the first to leave a review!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {displayedReviews.map((rev, index) => (
            <article
              key={rev._id || index}
              className="rounded-[20px] border border-black/10 bg-white p-6 sm:p-7 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <div className="flex items-center text-[#FFC700]">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        size={16}
                        className={
                          i < (rev.rating || 5)
                            ? "text-[#FFC700]"
                            : "text-gray-200"
                        }
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    className="text-black/40 hover:text-black"
                    aria-label="Review options"
                  >
                    <FiMoreHorizontal size={20} />
                  </button>
                </div>

                <div className="flex items-center gap-2 mb-2.5">
                  <span className="text-base sm:text-lg font-bold text-black">
                    {rev.name}
                  </span>
                  <FaCheckCircle className="text-[#01AB31]" size={16} />
                </div>

                <p className="text-xs sm:text-sm text-black/60 leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>

              <div className="mt-4 sm:mt-5 text-xs sm:text-sm font-medium text-black/60">
                Posted on {formatReviewDate(rev.date)}
              </div>
            </article>
          ))}
        </div>
      )}

      {/* View All Reviews Button: Shown ONLY when total reviews > 6 */}
      {hasMoreThanSix && (
        <div className="mt-8 sm:mt-9 text-center">
          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            className="rounded-full border border-black/10 px-8 sm:px-10 py-3 sm:py-3.5 text-xs sm:text-sm font-medium text-black transition-colors hover:bg-black hover:text-white"
          >
            {showAll ? "Show Less Reviews" : "Load More Reviews"}
          </button>
        </div>
      )}
    </div>
  );
}

export default Revies;
