import { useContext, useState, useEffect, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { FiChevronRight, FiSliders, FiChevronDown } from "react-icons/fi";
import { motion, AnimatePresence } from "motion/react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Newsletter from "../components/layout/Newsletter";
import ProductGrid from "../components/product/ProductGrid";
import Filters from "../components/shop/Filters";
import Pagination from "../components/shop/Pagination";
import { ProductContext } from "../context/ProductContext";

function Shop() {
  const { products, loading, error } = useContext(ProductContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryParam = searchParams.get("category");

  // Filter states
  const [appliedFilters, setAppliedFilters] = useState({
    category: "",
    dressStyle: "",
    priceRange: [0, 150],
    selectedColors: [],
    selectedSizes: [],
  });

  const [draftFilters, setDraftFilters] = useState({
    category: "",
    dressStyle: "",
    priceRange: [0, 150],
    selectedColors: [],
    selectedSizes: [],
  });

  const [sortBy, setSortBy] = useState("popular");
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Responsive items per page: 9 on desktop (>=1024px), 6 on mobile/responsive (<1024px)
  const [itemsPerPage, setItemsPerPage] = useState(() =>
    typeof window !== "undefined" && window.innerWidth >= 1024 ? 9 : 6
  );

  useEffect(() => {
    const handleResize = () => {
      const newSize = window.innerWidth >= 1024 ? 9 : 6;
      setItemsPerPage(newSize);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Sync category param with filters on load or searchParam changes
  useEffect(() => {
    if (categoryParam && categoryParam !== "new-arrivals" && categoryParam !== "top-selling") {
      setAppliedFilters((prev) => ({ ...prev, category: categoryParam }));
      setDraftFilters((prev) => ({ ...prev, category: categoryParam }));
    }
  }, [categoryParam]);

  // Handle Apply Filter action
  const handleApplyFilter = () => {
    setAppliedFilters({ ...draftFilters });
    setCurrentPage(1);
    setIsMobileFilterOpen(false);
  };

  // Handle Clear Filter action
  const handleClearFilter = () => {
    const reset = {
      category: "",
      dressStyle: "",
      priceRange: [0, 150],
      selectedColors: [],
      selectedSizes: [],
    };
    setDraftFilters(reset);
    setAppliedFilters(reset);
    setCurrentPage(1);
    setSearchParams({});
  };

  // Filter products based on applied filters & URL params
  const filteredProducts = useMemo(() => {
    if (!products) return [];

    return products.filter((p) => {
      const discountedPrice =
        p.discount > 0 ? p.price - (p.price * p.discount) / 100 : p.price;

      // URL Query params for New Arrivals & Top Selling
      if (categoryParam === "new-arrivals" && !p.isNewArrival) return false;
      if (categoryParam === "top-selling" && !p.isTopSelling) return false;

      // Category filter
      if (appliedFilters.category) {
        const targetCategory = appliedFilters.category.toLowerCase();
        const pCat = (p.category || "").toLowerCase();
        const catMatch =
          pCat === targetCategory ||
          (targetCategory === "hoodies" && pCat === "hoddies");
        if (!catMatch) return false;
      }

      // Dress Style filter
      if (appliedFilters.dressStyle) {
        if (
          (p.dressStyle || "").toLowerCase() !==
          appliedFilters.dressStyle.toLowerCase()
        ) {
          return false;
        }
      }

      // Price filter
      if (
        discountedPrice < appliedFilters.priceRange[0] ||
        discountedPrice > appliedFilters.priceRange[1]
      ) {
        return false;
      }

      // Color filter against database color values
      if (appliedFilters.selectedColors.length > 0) {
        const productColors = p.colors || [];
        const hasColor = appliedFilters.selectedColors.some((sc) =>
          productColors.some(
            (pc) =>
              pc.toLowerCase() === sc.toLowerCase() ||
              pc.toLowerCase().includes(sc.toLowerCase()) ||
              sc.toLowerCase().includes(pc.toLowerCase())
          )
        );
        if (!hasColor) return false;
      }

      // Size filter
      if (appliedFilters.selectedSizes.length > 0) {
        const productSizes = p.sizes || [];
        const hasSize = appliedFilters.selectedSizes.some((sz) =>
          productSizes.some((ps) => ps.toLowerCase() === sz.toLowerCase())
        );
        if (!hasSize) return false;
      }

      return true;
    });
  }, [products, categoryParam, appliedFilters]);

  // Sort filtered products
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === "low-high") {
      list.sort(
        (a, b) =>
          (a.price - (a.price * a.discount) / 100) -
          (b.price - (b.price * b.discount) / 100)
      );
    } else if (sortBy === "high-low") {
      list.sort(
        (a, b) =>
          (b.price - (b.price * b.discount) / 100) -
          (a.price - (a.price * a.discount) / 100)
      );
    } else if (sortBy === "newest") {
      list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else {
      list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }
    return list;
  }, [filteredProducts, sortBy]);

  // Responsive Pagination calculation (9 desktop, 6 mobile)
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const displayedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


  // Dynamic Title for page header
  const getPageTitle = () => {
    if (categoryParam === "new-arrivals") return "New Arrivals";
    if (categoryParam === "top-selling") return "Top Selling";
    if (appliedFilters.category) return appliedFilters.category;
    if (appliedFilters.dressStyle) return appliedFilters.dressStyle;
    return "Casual";
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-8 lg:px-16">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-xs text-black/60 sm:text-sm">
          <Link to="/" className="hover:text-black transition-colors">
            Home
          </Link>
          <FiChevronRight size={14} className="text-black/40" />
          <span className="font-semibold text-black">{getPageTitle()}</span>
        </nav>

        {/* Desktop & Mobile Main Layout */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4 lg:gap-7">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden rounded-[20px] border border-black/10 bg-white p-6 lg:block lg:col-span-1 h-fit">
            <Filters
              draftFilters={draftFilters}
              setDraftFilters={setDraftFilters}
              onApply={handleApplyFilter}
              onClear={handleClearFilter}
            />
          </aside>

          {/* Product Listing Main Area */}
          <section className="lg:col-span-3">
            {/* Header: Title, Count, Sort, Mobile Filter Icon */}
            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-2xl font-bold text-black sm:text-3xl lg:text-4xl">
                {getPageTitle()}
              </h1>

              <div className="flex items-center gap-3">
                <span className="hidden text-xs text-black/60 sm:inline-block sm:text-sm">
                  Showing {displayedProducts.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}-
                  {Math.min(currentPage * itemsPerPage, sortedProducts.length)} of {sortedProducts.length} Products
                </span>

                {/* Sort Dropdown */}
                <div className="relative flex items-center gap-1.5 text-xs text-black/60 sm:text-sm">
                  <span className="hidden sm:inline">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="cursor-pointer bg-transparent font-bold text-black outline-none"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="low-high">Price: Low to High</option>
                    <option value="high-low">Price: High to Low</option>
                    <option value="newest">Newest</option>
                  </select>
                </div>

                {/* Mobile Filter Button */}
                <button
                  type="button"
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F0F0F0] text-black lg:hidden"
                  aria-label="Open filters"
                >
                  <FiSliders size={18} />
                </button>
              </div>
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="py-20 text-center text-gray-500 font-medium">
                Loading products...
              </div>
            ) : error ? (
              <div className="py-20 text-center text-red-500 font-medium">
                {error}
              </div>
            ) : (
              <>
                <ProductGrid products={displayedProducts} variant="shop" />

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={(page) => {
                    setCurrentPage(page);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                />
              </>
            )}
          </section>
        </div>
      </main>

      {/* Mobile Filter Drawer (Slides up from BOTTOM) */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            />

            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-x-0 bottom-0 z-50 max-h-[85vh] overflow-y-auto rounded-t-[20px] bg-white p-6 shadow-2xl lg:hidden"
            >
              <Filters
                draftFilters={draftFilters}
                setDraftFilters={setDraftFilters}
                onApply={handleApplyFilter}
                onClear={handleClearFilter}
                onClose={() => setIsMobileFilterOpen(false)}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Newsletter />
      <Footer />
    </div>
  );
}

export default Shop;