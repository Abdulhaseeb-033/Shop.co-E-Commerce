import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

function ProductImages({ images = [], productName = "Product" }) {
  const [selectedImage, setSelectedImage] = useState(0);

  const displayImages = images.length > 0 ? images : [""];
  const activeImage = displayImages[selectedImage] || displayImages[0];

  return (
    <div className="flex flex-col-reverse gap-3.5 sm:gap-4 lg:flex-row lg:gap-4 w-full">
      {/* Thumbnails list: Vertical on Desktop, Horizontal on Mobile */}
      <div className="flex flex-row gap-3 overflow-x-auto lg:flex-col lg:gap-3.5 lg:overflow-visible shrink-0 no-scrollbar">
        {displayImages.map((img, index) => {
          const isSelected = selectedImage === index;
          return (
            <button
              key={index}
              type="button"
              onClick={() => setSelectedImage(index)}
              className={`relative h-[96px] w-[96px] sm:h-[120px] sm:w-[120px] lg:h-[167px] lg:w-[152px] shrink-0 overflow-hidden rounded-[20px] bg-[#F0EEED] transition-all cursor-pointer ${
                isSelected
                  ? "ring-2 ring-black ring-offset-1"
                  : "opacity-70 hover:opacity-100 ring-1 ring-black/5"
              }`}
              aria-label={`Select product image ${index + 1}`}
            >
              {img ? (
                <img
                  src={img}
                  alt={`${productName} thumbnail ${index + 1}`}
                  className="h-full w-full object-cover object-center"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                  No image
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Main Preview Image */}
      <div className="relative aspect-[1/1] w-full flex-1 overflow-hidden rounded-[20px] bg-[#F0EEED] lg:h-[530px]">
        <AnimatePresence mode="wait">
          {activeImage ? (
            <motion.img
              key={activeImage}
              src={activeImage}
              alt={productName}
              initial={{ opacity: 0.6 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0.6 }}
              transition={{ duration: 0.2 }}
              className="h-full w-full object-cover object-center"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-gray-400">
              No image available
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default ProductImages;
