import { motion } from "motion/react";
import casualImg from "../../assets/casual.png";
import formalImg from "../../assets/formal.png";
import partyImg from "../../assets/party.png";
import gymImg from "../../assets/gym.png";

const styles = [
  {
    name: "Casual",
    image: casualImg,
    className: "md:col-span-4",
    imgPos: "object-right-top",
  },
  {
    name: "Formal",
    image: formalImg,
    className: "md:col-span-8",
    imgPos: "object-center",
  },
  {
    name: "Party",
    image: partyImg,
    className: "md:col-span-8",
    imgPos: "object-center",
  },
  {
    name: "Gym",
    image: gymImg,
    className: "md:col-span-4",
    imgPos: "object-right-top",
  },
];

function DressStyles() {
  return (
    <section className="bg-white px-4 py-8 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl rounded-[28px] bg-[#F0F0F0] px-6 py-10 sm:rounded-[40px] sm:px-14 sm:py-16">
        <h2 className="mb-7 text-center text-3xl font-black uppercase tracking-tight text-black sm:mb-14 sm:text-4xl lg:text-[48px]">
          BROWSE BY DRESS STYLE
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 sm:gap-5">
          {styles.map((style) => (
            <div
              key={style.name}
              className={`group relative h-[190px] overflow-hidden rounded-[20px] bg-white sm:h-[289px] ${style.className}`}
            >
              <span className="absolute left-6 top-4 z-10 text-2xl font-bold text-black sm:left-9 sm:top-6 sm:text-4xl">
                {style.name}
              </span>

              <motion.img
                src={style.image}
                alt={style.name}
                className={`h-full w-full object-cover select-none ${style.imgPos}`}
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DressStyles;
