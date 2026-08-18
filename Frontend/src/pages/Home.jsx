import { useContext } from "react";
import Header from "../components/layout/Header";
import Hero from "../components/home/Hero";
import Brands from "../components/home/Brands";
import ProductSection from "../components/home/ProductSection";
import DressStyles from "../components/home/DressStyles";
import CustomReviews from "../components/home/CustomReviews";
import Newsletter from "../components/layout/Newsletter";
import Footer from "../components/layout/Footer";
import { ProductContext } from "../context/ProductContext";

function Home() {
  const { products, loading, error } = useContext(ProductContext);

  const newArrivals = products.filter((p) => p.isNewArrival === true).slice(0, 4);
  const topSelling = products.filter((p) => p.isTopSelling === true).slice(0, 4);

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <Header />

      <main>
        <Hero />

        <Brands />

        {loading ? (
          <div className="py-16 text-center text-gray-500 font-medium">
            Loading products...
          </div>
        ) : error ? (
          <div className="py-16 text-center text-red-500 font-medium">
            {error}
          </div>
        ) : (
          <>
            <ProductSection
              title="NEW ARRIVALS"
              products={newArrivals.length > 0 ? newArrivals : products.slice(0, 4)}
              viewAllLink="/shop?category=new-arrivals"
              showDivider={true}
            />

            <ProductSection
              title="TOP SELLING"
              products={topSelling.length > 0 ? topSelling : products.slice(0, 4)}
              viewAllLink="/shop?category=top-selling"
              showDivider={false}
            />
          </>
        )}

        <DressStyles />

        <CustomReviews />

        <Newsletter />
      </main>

      <Footer />
    </div>
  );
}

export default Home;