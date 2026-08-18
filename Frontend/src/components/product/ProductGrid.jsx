import ProductCard from "./ProductCard";

const ProductGrid = ({ products = [], variant = "home" }) => {
  if (!products || products.length === 0) {
    return (
      <div className="py-12 text-center text-gray-500 font-medium">
        No products found matching the selected criteria.
      </div>
    );
  }

  if (variant === "shop") {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 sm:gap-5 lg:gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex w-full overflow-x-auto snap-x snap-mandatory gap-4 pb-4 sm:pb-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-x-5 lg:gap-x-6 sm:overflow-visible no-scrollbar">
      {products.map((product) => (
        <div
          key={product._id}
          className="w-[200px] shrink-0 snap-start sm:w-auto sm:shrink-1"
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
