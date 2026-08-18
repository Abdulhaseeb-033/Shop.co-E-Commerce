import { useRef } from "react";
import { FaStar, FaCheckCircle } from "react-icons/fa";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

const reviews = [
  {
    id: 1,
    name: "Sarah M.",
    rating: 5,
    comment:
      "\"I'm blown away by the quality and craftsmanship of their clothes. Every piece I've bought has exceeded my expectations.\"",
  },
  {
    id: 2,
    name: "Alex K.",
    rating: 5,
    comment:
      "\"Finding clothes that fit my body type used to be a struggle. SHOP.CO made it easy to find stylish and comfortable outfits.\"",
  },
  {
    id: 3,
    name: "James L.",
    rating: 5,
    comment:
      "\"As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon SHOP.CO.\"",
  },
  {
    id: 4,
    name: "Emily R.",
    rating: 5,
    comment:
      "\"The delivery was surprisingly fast, and the customer support team went above and beyond to help with my exchange.\"",
  },
  {
    id: 5,
    name: "Michael B.",
    rating: 5,
    comment:
      "\"Exceptional fabric quality and clean stitching! Easily my favorite online store now.\"",
  },
];

function CustomReviews() {
  const scrollRef = useRef(null);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth > 640 ? 420 : 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="bg-white px-4 py-12 sm:px-8 sm:py-16 lg:px-16 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-end justify-between sm:mb-10">
          <h2 className="text-3xl font-black uppercase tracking-tight text-black sm:text-4xl lg:text-[48px]">
            OUR HAPPY CUSTOMERS
          </h2>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleScroll("left")}
              aria-label="Previous reviews"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-black transition-colors hover:bg-black hover:text-white sm:h-11 sm:w-11"
            >
              <FiArrowLeft size={20} />
            </button>

            <button
              type="button"
              onClick={() => handleScroll("right")}
              aria-label="Next reviews"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-black transition-colors hover:bg-black hover:text-white sm:h-11 sm:w-11"
            >
              <FiArrowRight size={20} />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex w-full overflow-x-auto snap-x snap-mandatory gap-4 pb-4 sm:gap-5 scrollbar-none"
        >
          {reviews.map((rev) => (
            <article
              key={rev.id}
              className="w-[280px] shrink-0 snap-start rounded-[20px] border border-black/10 bg-white p-6 sm:w-[360px] md:w-[400px] sm:p-7"
            >
              <div className="flex items-center text-[#FFC700] mb-3">
                {[...Array(rev.rating)].map((_, i) => (
                  <FaStar key={i} size={18} />
                ))}
              </div>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg font-bold text-black sm:text-xl">
                  {rev.name}
                </span>
                <FaCheckCircle className="text-[#01AB31]" size={16} />
              </div>

              <p className="text-sm text-black/60 leading-relaxed sm:text-base">
                {rev.comment}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CustomReviews;
