import { Link } from "react-router-dom";
import {
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaGithub,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaCcApplePay,
  FaGooglePay,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-[#F0F0F0] pt-28 pb-10 px-4 sm:px-8 lg:px-16 text-black/60">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 border-b border-black/10 pb-10 md:grid-cols-2 lg:grid-cols-5 lg:gap-12">
          <div className="lg:col-span-1">
            <Link
              to="/"
              className="text-3xl font-black tracking-tighter text-black"
            >
              SHOP.CO
            </Link>
            <p className="mt-4 text-xs leading-relaxed sm:text-sm">
              We have clothes that suits your style and which you're proud to
              wear. From women to men.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="#twitter"
                aria-label="Twitter"
                className="flex h-7 w-7 items-center justify-center rounded-full border border-black/10 bg-white text-black transition-colors hover:bg-black hover:text-white"
              >
                <FaTwitter size={13} />
              </a>
              <a
                href="#facebook"
                aria-label="Facebook"
                className="flex h-7 w-7 items-center justify-center rounded-full border border-black/10 bg-white text-black transition-colors hover:bg-black hover:text-white"
              >
                <FaFacebookF size={13} />
              </a>
              <a
                href="#instagram"
                aria-label="Instagram"
                className="flex h-7 w-7 items-center justify-center rounded-full border border-black/10 bg-white text-black transition-colors hover:bg-black hover:text-white"
              >
                <FaInstagram size={13} />
              </a>
              <a
                href="#github"
                aria-label="GitHub"
                className="flex h-7 w-7 items-center justify-center rounded-full border border-black/10 bg-white text-black transition-colors hover:bg-black hover:text-white"
              >
                <FaGithub size={13} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-black">
              COMPANY
            </h4>
            <ul className="mt-4 space-y-3 text-xs sm:text-sm">
              <li>
                <a href="#about" className="hover:text-black transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-black transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#works" className="hover:text-black transition-colors">
                  Works
                </a>
              </li>
              <li>
                <a href="#career" className="hover:text-black transition-colors">
                  Career
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-black">
              HELP
            </h4>
            <ul className="mt-4 space-y-3 text-xs sm:text-sm">
              <li>
                <a href="#support" className="hover:text-black transition-colors">
                  Customer Support
                </a>
              </li>
              <li>
                <a href="#delivery" className="hover:text-black transition-colors">
                  Delivery Details
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-black transition-colors">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-black transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-black">
              FAQ
            </h4>
            <ul className="mt-4 space-y-3 text-xs sm:text-sm">
              <li>
                <a href="#account" className="hover:text-black transition-colors">
                  Account
                </a>
              </li>
              <li>
                <a href="#deliveries" className="hover:text-black transition-colors">
                  Manage Deliveries
                </a>
              </li>
              <li>
                <a href="#orders" className="hover:text-black transition-colors">
                  Orders
                </a>
              </li>
              <li>
                <a href="#payments" className="hover:text-black transition-colors">
                  Payments
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-black">
              RESOURCES
            </h4>
            <ul className="mt-4 space-y-3 text-xs sm:text-sm">
              <li>
                <a href="#ebooks" className="hover:text-black transition-colors">
                  Free eBooks
                </a>
              </li>
              <li>
                <a href="#tutorial" className="hover:text-black transition-colors">
                  Development Tutorial
                </a>
              </li>
              <li>
                <a href="#blog" className="hover:text-black transition-colors">
                  How to - Blog
                </a>
              </li>
              <li>
                <a href="#youtube" className="hover:text-black transition-colors">
                  Youtube Playlist
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-4 text-xs sm:text-sm sm:flex-row">
          <p className="text-center sm:text-left">
            Shop.co © 2000-2023, All Rights Reserved
          </p>

          <div className="flex items-center gap-3 text-2xl text-black">
            <span className="flex h-7 w-12 items-center justify-center rounded bg-white border border-black/10">
              <FaCcVisa className="text-blue-900" size={24} />
            </span>
            <span className="flex h-7 w-12 items-center justify-center rounded bg-white border border-black/10">
              <FaCcMastercard className="text-red-600" size={24} />
            </span>
            <span className="flex h-7 w-12 items-center justify-center rounded bg-white border border-black/10">
              <FaCcPaypal className="text-blue-700" size={24} />
            </span>
            <span className="flex h-7 w-12 items-center justify-center rounded bg-white border border-black/10">
              <FaCcApplePay className="text-black" size={24} />
            </span>
            <span className="flex h-7 w-12 items-center justify-center rounded bg-white border border-black/10">
              <FaGooglePay className="text-black" size={24} />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
