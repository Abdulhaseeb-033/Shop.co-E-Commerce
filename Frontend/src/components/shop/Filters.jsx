import { FiSliders, FiChevronRight, FiCheck, FiX } from "react-icons/fi";

const categories = ["T-Shirts", "Shorts", "Shirts", "Hoodies", "Jeans"];

const dressStyles = ["Casual", "Formal", "Party", "Gym", "Streetwear"];

const colorOptions = [
  { name: "Black", bg: "#000000" },
  { name: "Charcoal", bg: "#36454F" },
  { name: "Navy", bg: "#000080" },
  { name: "Slate gray", bg: "#708090" },
  { name: "Olive", bg: "#808000" },
  { name: "Sage green", bg: "#8A9A86" },
  { name: "Khaki", bg: "#C3B091" },
  { name: "Beige", bg: "#F5F5DC", border: true },
  { name: "Charcoal grey", bg: "#4A5459" },
  { name: "White", bg: "#FFFFFF", border: true },
  { name: "Olive green", bg: "#556B2F" },
  { name: "Navy blue", bg: "#00008B" },
  { name: "Blue/olive", bg: "#1F4E5B" },
  { name: "Charcoal green", bg: "#2E4036" },
  { name: "Teal blue", bg: "#008080" },
  { name: "Grey", bg: "#808080" },
  { name: "Medium blue", bg: "#0000CD" },
];


const sizeOptions = ["S", "M", "L", "XL", "XXL", "28", "30", "32", "34", "36"];

function Filters({ draftFilters, setDraftFilters, onApply, onClear, onClose }) {
  const handleCategoryClick = (cat) => {
    setDraftFilters((prev) => ({
      ...prev,
      category: prev.category === cat ? "" : cat,
    }));
  };

  const handleDressStyleClick = (style) => {
    setDraftFilters((prev) => ({
      ...prev,
      dressStyle: prev.dressStyle === style ? "" : style,
    }));
  };

  const handleColorToggle = (colorName) => {
    setDraftFilters((prev) => {
      const exists = prev.selectedColors.includes(colorName);
      return {
        ...prev,
        selectedColors: exists
          ? prev.selectedColors.filter((c) => c !== colorName)
          : [...prev.selectedColors, colorName],
      };
    });
  };

  const handleSizeToggle = (sizeVal) => {
    setDraftFilters((prev) => {
      const exists = prev.selectedSizes.includes(sizeVal);
      return {
        ...prev,
        selectedSizes: exists
          ? prev.selectedSizes.filter((s) => s !== sizeVal)
          : [...prev.selectedSizes, sizeVal],
      };
    });
  };

  const handlePriceChange = (e) => {
    const val = Number(e.target.value);
    setDraftFilters((prev) => ({
      ...prev,
      priceRange: [prev.priceRange[0], val],
    }));
  };

  return (
    <div className="w-full bg-white text-black">
      {/* Filters Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xl font-bold text-black">
          <span>Filters</span>
          <FiSliders size={20} className="hidden sm:inline-block" />
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onClear}
            className="text-xs text-black/50 hover:text-black font-medium underline underline-offset-2"
          >
            Clear All
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="text-black/60 hover:text-black lg:hidden"
              aria-label="Close filters"
            >
              <FiX size={22} />
            </button>
          )}
        </div>
      </div>

      <div className="my-5 border-t border-black/10" />

      {/* Categories */}
      <div className="space-y-3">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => handleCategoryClick(cat)}
            className={`flex w-full items-center justify-between text-sm transition-colors ${
              draftFilters.category === cat
                ? "font-bold text-black"
                : "text-black/60 hover:text-black"
            }`}
          >
            <span>{cat}</span>
            <FiChevronRight size={16} className="text-black/40" />
          </button>
        ))}
      </div>

      <div className="my-5 border-t border-black/10" />

      {/* Price */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-lg font-bold text-black">Price</span>
        </div>
        <input
          type="range"
          min="0"
          max="150"
          value={draftFilters.priceRange[1]}
          onChange={handlePriceChange}
          className="w-full accent-black cursor-pointer"
        />
        <div className="mt-2 flex items-center justify-between text-xs font-semibold text-black">
          <span>${draftFilters.priceRange[0]}</span>
          <span>${draftFilters.priceRange[1]}</span>
        </div>
      </div>

      <div className="my-5 border-t border-black/10" />

      {/* Colors */}
      <div>
        <span className="block mb-3 text-lg font-bold text-black">Colors</span>
        <div className="flex flex-wrap gap-2.5">
          {colorOptions.map((c) => {
            const isSelected = draftFilters.selectedColors.includes(c.name);
            return (
              <button
                key={c.name}
                type="button"
                onClick={() => handleColorToggle(c.name)}
                style={{ backgroundColor: c.bg }}
                className={`relative flex h-9 w-9 items-center justify-center rounded-full transition-transform hover:scale-105 ${
                  c.border ? "border border-black/20" : ""
                }`}
                title={c.name}
                aria-label={c.name}
              >
                {isSelected && (
                  <FiCheck
                    size={16}
                    className={
                      c.name === "White" || c.name === "Beige"
                        ? "text-black"
                        : "text-white"
                    }
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="my-5 border-t border-black/10" />

      {/* Size */}
      <div>
        <span className="block mb-3 text-lg font-bold text-black">Size</span>
        <div className="flex flex-wrap gap-2">
          {sizeOptions.map((sz) => {
            const isSelected = draftFilters.selectedSizes.includes(sz);
            return (
              <button
                key={sz}
                type="button"
                onClick={() => handleSizeToggle(sz)}
                className={`rounded-full px-4 py-2 text-xs font-medium transition-colors ${
                  isSelected
                    ? "bg-black text-white"
                    : "bg-[#F0F0F0] text-black/60 hover:bg-gray-200"
                }`}
              >
                {sz}
              </button>
            );
          })}
        </div>
      </div>

      <div className="my-5 border-t border-black/10" />

      {/* Dress Style */}
      <div>
        <span className="block mb-3 text-lg font-bold text-black">
          Dress Style
        </span>
        <div className="space-y-3">
          {dressStyles.map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => handleDressStyleClick(st)}
              className={`flex w-full items-center justify-between text-sm transition-colors ${
                draftFilters.dressStyle === st
                  ? "font-bold text-black"
                  : "text-black/60 hover:text-black"
              }`}
            >
              <span>{st}</span>
              <FiChevronRight size={16} className="text-black/40" />
            </button>
          ))}
        </div>
      </div>

      <div className="mt-7">
        <button
          type="button"
          onClick={onApply}
          className="w-full rounded-full bg-black py-3.5 text-center text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Apply Filter
        </button>
      </div>
    </div>
  );
}

export default Filters;
