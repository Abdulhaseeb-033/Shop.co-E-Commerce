import { Link } from "react-router-dom";
import ProductGrid from "../product/ProductGrid";

function ProductSection({ title, products = [], viewAllLink, showDivider = true }) {
  const displayedProducts = products.slice(0, 4);

  return (
    <section className="bg-white px-4 py-12 sm:px-8 sm:py-16 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-8 text-center text-3xl font-black uppercase tracking-tight text-black sm:mb-14 sm:text-4xl lg:text-5xl">
          {title}
        </h2>

        <ProductGrid products={displayedProducts} />

        <div className="mt-8 flex justify-center sm:mt-12">
          <Link
            to={viewAllLink}
            className="flex h-12 w-full items-center justify-center rounded-full border border-black/10 text-sm font-medium text-black transition-colors duration-200 hover:bg-black hover:text-white sm:w-[218px]"
          >
            View All
          </Link>
        </div>

        {showDivider && (
          <div className="mt-12 w-full border-t border-black/10 sm:mt-16" />
        )}
      </div>
    </section>
  );
}

export default ProductSection;


