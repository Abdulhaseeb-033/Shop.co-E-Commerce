import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="mt-9 flex items-center justify-between border-t border-black/10 pt-5 text-sm">
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="flex items-center gap-2 rounded-lg border border-black/10 px-3.5 py-2 text-xs font-medium text-black transition-colors hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-40 sm:text-sm"
      >
        <FiArrowLeft size={16} />
        <span>Previous</span>
      </button>

      <div className="flex items-center gap-1 sm:gap-2">
        {pageNumbers.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange(p)}
            className={`flex h-9 w-9 items-center justify-center rounded-lg text-xs font-medium transition-colors sm:text-sm ${
              currentPage === p
                ? "bg-[#F0F0F0] font-bold text-black"
                : "text-black/50 hover:bg-gray-100 hover:text-black"
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="flex items-center gap-2 rounded-lg border border-black/10 px-3.5 py-2 text-xs font-medium text-black transition-colors hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-40 sm:text-sm"
      >
        <span>Next</span>
        <FiArrowRight size={16} />
      </button>
    </div>
  );
}

export default Pagination;
