function ProductDetails({ product }) {
  if (!product) return null;

  const details = product.details || {};

  const specList = [
    { label: "Material", value: details.material },
    { label: "Fit Type", value: details.fit },
    { label: "Origin", value: details.origin },
    { label: "Care Instructions", value: details.care },
    { label: "Pattern", value: details.pattern },
    { label: "Category", value: product.category },
    { label: "Dress Style", value: product.dressStyle },
    { label: "Stock Availability", value: product.stock !== undefined ? `${product.stock} in stock` : "In stock" },
  ].filter((item) => Boolean(item.value));

  // Split description paragraphs if any
  const paragraphs = (product.description || "").split("\n\n").filter(Boolean);

  return (
    <div className="w-full text-black space-y-8 sm:space-y-10">
      {/* Detailed Description */}
      <div>
        <h3 className="text-lg sm:text-xl font-bold text-black mb-3">
          About the Product
        </h3>
        <div className="space-y-3 text-sm sm:text-base text-black/70 leading-relaxed">
          {paragraphs.length > 0 ? (
            paragraphs.map((p, idx) => <p key={idx}>{p}</p>)
          ) : (
            <p>{product.description || "No detailed description available."}</p>
          )}
        </div>
      </div>

      {/* Specifications Grid */}
      {specList.length > 0 && (
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-black mb-4">
            Product Specifications
          </h3>
          <div className="overflow-hidden rounded-[16px] border border-black/10">
            <div className="divide-y divide-black/10">
              {specList.map((spec, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-1 sm:grid-cols-3 p-4 sm:px-6 sm:py-3.5 text-sm ${
                    index % 2 === 0 ? "bg-white" : "bg-[#F9F9F9]"
                  }`}
                >
                  <span className="font-semibold text-black/80 sm:col-span-1">
                    {spec.label}
                  </span>
                  <span className="text-black/60 sm:col-span-2 mt-1 sm:mt-0">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
