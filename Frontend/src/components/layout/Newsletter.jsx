import { FiMail } from "react-icons/fi";

function Newsletter() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className="relative z-20 px-4 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl -mb-20 rounded-[20px] bg-black px-6 py-8 sm:px-16 sm:py-11 shadow-xl">
        <div className="flex flex-col items-center justify-between gap-6 lg:flex-row lg:gap-10">
          <h2 className="text-3xl font-black uppercase leading-[1.05] tracking-tight text-white sm:text-4xl max-w-xl">
            STAY UPTO DATE ABOUT OUR LATEST OFFERS
          </h2>

          <form
            onSubmit={handleSubmit}
            className="w-full space-y-3.5 lg:w-[350px]"
          >
            <div className="flex items-center gap-3 rounded-full bg-white px-4 py-3 text-gray-500">
              <FiMail size={20} className="shrink-0 text-gray-400" />
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full bg-transparent text-sm text-black outline-none placeholder:text-gray-400"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-white py-3.5 text-center text-sm font-medium text-black transition-colors duration-200 hover:bg-gray-100"
            >
              Subscribe to Newsletter
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;
