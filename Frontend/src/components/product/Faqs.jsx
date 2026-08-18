import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { motion, AnimatePresence } from "motion/react";

function Faqs({ product }) {
  const faqs = product?.faqs || [];
  const [openIndex, setOpenIndex] = useState(0); // Open first by default if available

  const toggleFaq = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  if (!faqs || faqs.length === 0) {
    return (
      <div className="py-12 text-center text-black/50 font-medium">
        No FAQs available for this product yet.
      </div>
    );
  }

  return (
    <div className="w-full text-black max-w-4xl mx-auto space-y-4">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={faq._id || index}
            className="rounded-[16px] border border-black/10 bg-white overflow-hidden transition-colors"
          >
            <button
              type="button"
              onClick={() => toggleFaq(index)}
              className="flex w-full items-center justify-between p-5 sm:p-6 text-left font-bold text-sm sm:text-base text-black hover:bg-black/[0.02]"
              aria-expanded={isOpen}
            >
              <span>{faq.question}</span>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="shrink-0 text-black/60 ml-4"
              >
                <FiChevronDown size={20} />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-black/5 px-5 pb-5 pt-3 sm:px-6 sm:pb-6 sm:pt-4 text-xs sm:text-sm text-black/60 leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export default Faqs;
