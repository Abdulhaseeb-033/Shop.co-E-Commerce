import { useContext, useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Newsletter from "../components/layout/Newsletter";
import ProductImages from "../components/product/ProductImages";
import ProductInfo from "../components/product/ProductInfo";
import ProductDetails from "../components/product/ProductDetails";
import Revies from "../components/product/Revies";
import Faqs from "../components/product/Faqs";
import ProductCard from "../components/product/ProductCard";
import { ProductContext } from "../context/ProductContext";

function ProductDetail() {
  const { id } = useParams();
  const { products, loading, error } = useContext(ProductContext);
  const [activeTab, setActiveTab] = useState("reviews");

  // Scroll to top when product ID changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  // Find product by id from URL params
  const product = useMemo(() => {
    if (!products || products.length === 0) return null;
    return products.find((p) => String(p._id) === String(id) || String(p.id) === String(id));
  }, [products, id]);

  // Related products for "YOU MIGHT ALSO LIKE"
  const relatedProducts = useMemo(() => {
    if (!products || !product) return [];

    // Filter out current product
    const otherProducts = products.filter(
      (p) => String(p._id) !== String(product._id) && String(p.id) !== String(product.id)
    );

    // Prefer same category or dressStyle
    const matching = otherProducts.filter(
      (p) =>
        (product.category && p.category?.toLowerCase() === product.category?.toLowerCase()) ||
        (product.dressStyle && p.dressStyle?.toLowerCase() === product.dressStyle?.toLowerCase())
    );

    if (matching.length >= 4) {
      return matching.slice(0, 4);
    }

    // Fill remaining with other products
    const combined = [...matching];
    for (const p of otherProducts) {
      if (!combined.some((item) => item._id === p._id)) {
        combined.push(p);
      }
      if (combined.length === 4) break;
    }
    return combined;
  }, [products, product]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white text-black font-sans flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center py-20">
          <div className="text-lg font-medium text-black/60 animate-pulse">
            Loading product details...
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white text-black font-sans flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center py-20 px-4 text-center">
          <h2 className="text-2xl font-bold text-black mb-3">Product Not Found</h2>
          <p className="text-black/60 mb-6">
            The product you are looking for does not exist or has been removed.
          </p>
          <Link
            to="/shop"
            className="rounded-full bg-black px-8 py-3 text-sm font-medium text-white hover:opacity-90 transition-opacity"
          >
            Back to Shop
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-8 lg:px-16">
        {/* Breadcrumb Navigation */}
        <nav className="mb-6 sm:mb-8 flex flex-wrap items-center gap-2 text-xs text-black/60 sm:text-sm">
          <Link to="/" className="hover:text-black transition-colors">
            Home
          </Link>
          <FiChevronRight size={14} className="text-black/40" />
          <Link to="/shop" className="hover:text-black transition-colors">
            Shop
          </Link>
          {product.category && (
            <>
              <FiChevronRight size={14} className="text-black/40" />
              <Link
                to={`/shop?category=${encodeURIComponent(product.category)}`}
                className="hover:text-black transition-colors"
              >
                {product.category}
              </Link>
            </>
          )}
          <FiChevronRight size={14} className="text-black/40" />
          <span className="font-semibold text-black truncate max-w-[200px] sm:max-w-none">
            {product.name}
          </span>
        </nav>

        {/* Top Product Information Section (Gallery + Info) */}
        <section className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10 items-start">
          <ProductImages images={product.images} productName={product.name} />
          <ProductInfo product={product} />
        </section>

        {/* Product Tabs Section */}
        <section className="mt-14 sm:mt-18 lg:mt-20">
          {/* Tab Navigation Header */}
          <div className="flex border-b border-black/10 text-center text-sm sm:text-lg">
            <button
              type="button"
              onClick={() => setActiveTab("details")}
              className={`flex-1 pb-4 transition-all cursor-pointer ${
                activeTab === "details"
                  ? "border-b-2 border-black font-bold text-black"
                  : "text-black/60 hover:text-black font-normal"
              }`}
            >
              Product Details
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("reviews")}
              className={`flex-1 pb-4 transition-all cursor-pointer ${
                activeTab === "reviews"
                  ? "border-b-2 border-black font-bold text-black"
                  : "text-black/60 hover:text-black font-normal"
              }`}
            >
              Rating & Reviews
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("faqs")}
              className={`flex-1 pb-4 transition-all cursor-pointer ${
                activeTab === "faqs"
                  ? "border-b-2 border-black font-bold text-black"
                  : "text-black/60 hover:text-black font-normal"
              }`}
            >
              FAQs
            </button>
          </div>

          {/* Tab Content Panel */}
          <div className="py-6 sm:py-8">
            {activeTab === "details" && <ProductDetails product={product} />}
            {activeTab === "reviews" && <Revies product={product} />}
            {activeTab === "faqs" && <Faqs product={product} />}
          </div>
        </section>

        {/* YOU MIGHT ALSO LIKE Section */}
        {relatedProducts.length > 0 && (
          <section className="mt-14 sm:mt-18 lg:mt-20">
            <h2 className="text-3xl font-black uppercase tracking-tight text-black sm:text-4xl lg:text-[48px] text-center mb-8 sm:mb-12">
              YOU MIGHT ALSO LIKE
            </h2>

            <div className="flex w-full overflow-x-auto snap-x snap-mandatory gap-4 pb-4 sm:pb-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-x-5 lg:gap-x-6 sm:overflow-visible no-scrollbar">
              {relatedProducts.map((relProduct) => (
                <div
                  key={relProduct._id || relProduct.id}
                  className="w-[200px] shrink-0 snap-start sm:w-auto sm:shrink-1"
                >
                  <ProductCard product={relProduct} />
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <Newsletter />
      <Footer />
    </div>
  );
}

export default ProductDetail;