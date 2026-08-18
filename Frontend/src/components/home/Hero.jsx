import { Link } from "react-router-dom";
import heroImage from "../../assets/hero.jpg";

const Hero = () => {
  return (
    <section className="w-full bg-[#f2f0f1] overflow-hidden lg:h-[580px]">
      <div className="mx-auto flex min-h-[520px] max-w-7xl flex-col lg:min-h-[520px] lg:flex-row lg:items-stretch">

        <div className="flex w-full flex-col justify-center px-5 pt-10 sm:px-8 sm:pt-12 lg:w-1/2 lg:px-8 lg:-translate-y-15 xl:px-6">

          <h1 className="max-w-[520px] text-[40px] font-black leading-[0.95] tracking-[-1.5px] sm:text-5xl lg:text-[52px] xl:text-[56px]">
            FIND CLOTHES
            <br />
            THAT MATCHES
            <br />
            YOUR STYLE
          </h1>

          <p className="mt-5 max-w-[500px] text-sm leading-5 text-black/60 sm:text-base">
            Browse through our diverse range of meticulously crafted
            garments, designed to bring out your individuality and cater
            to your sense of style.
          </p>

          <Link
            to="/shop"
            className="mt-7 flex h-12 w-full items-center justify-center rounded-full bg-black text-sm font-medium text-white transition-opacity hover:opacity-80 sm:w-[210px]"
          >
            Shop Now
          </Link>

          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 lg:grid-cols-3 lg:gap-x-8">

           <div className="pr-5 lg:border-r lg:border-black/10">
             <h3 className="text-2xl font-bold leading-none sm:text-3xl">
                200+
             </h3>

             <p className="mt-2 text-xs text-black/50 sm:text-sm">
               International Brands
             </p>
           </div>        

           <div className="pr-5 lg:border-r lg:border-black/10">
             <h3 className="text-2xl font-bold leading-none sm:text-3xl">
                2,000+
             </h3>

             <p className="mt-2 text-xs text-black/50 sm:text-sm">
               High-Quality Products
             </p>
           </div>
        
           <div className="col-span-2 text-center lg:col-span-1 lg:text-left">
             <h3 className="text-2xl font-bold leading-none sm:text-3xl">
                30,000+
             </h3>

             <p className="mt-2 text-xs text-black/50 sm:text-sm">
               Happy Customers
             </p>
           </div>

          </div>
        </div>

        <div className="relative flex w-full items-end justify-center lg:w-1/2">

          <span className="absolute right-8 top-12 z-10 hidden text-6xl leading-none lg:block">
            ✦
          </span>

          <span className="absolute left-5 top-1/2 z-10 hidden text-4xl leading-none lg:block">
            ✦
          </span>

            <img
            src={heroImage}
            alt="Fashion models"
            className="h-170 w-130 object-cover object-top"
            />
        </div>
      </div>
    </section>
  );
};

export default Hero;