import { motion } from "motion/react";

function Brands () {
  const brands = [
    "VERSACE",
    "ZARA",
    "GUCCI",
    "PRADA",
    "Calvin Klein",
  ];

  return (
    <section className="overflow-hidden bg-black py-8 sm:py-9">
      <motion.div
        className="flex w-max items-center gap-12 sm:gap-16 lg:gap-20"
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {[...brands, ...brands].map((brand, index) => (
          <span
            key={`${brand}-${index}`}
            className="whitespace-nowrap text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl"
          >
            {brand}
          </span>
        ))}
      </motion.div>
    </section>
  );
};

export default Brands;