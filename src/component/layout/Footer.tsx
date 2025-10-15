import React from "react";
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white px-6 md:px-16 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10">

        {/* Exclusive - Subscribe */}
        <div>
          <h3 className="text-lg font-bold mb-2">Exclusive</h3>
          <p className="font-semibold mb-2">Subscribe</p>
          <p className="text-sm mb-4">Get 10% off your first order</p>
          <form className="flex items-center border border-gray-500 rounded overflow-hidden">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-black text-white px-3 py-2 flex-1 outline-none"
            />
            <button type="submit" className="bg-white text-black px-4 py-2">
              ➤
            </button>
          </form>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-bold mb-2">Support</h3>
          <p className="text-sm leading-relaxed">
            111 Bijoy sarani, Dhaka, <br />
            DH 1515, Bangladesh.
          </p>
          <p className="text-sm mt-2">exclusive@gmail.com</p>
          <p className="text-sm">+88015-88888-9999</p>
        </div>

        {/* Account */}
        <div>
          <h3 className="text-lg font-bold mb-2">Account</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/profile" className="hover:text-gray-400">My Account</Link></li>
            <li><Link href="/login" className="hover:text-gray-400">Login / Register</Link></li>
            <li><Link href="/cart" className="hover:text-gray-400">Cart</Link></li>
            <li><Link href="/wishlist" className="hover:text-gray-400">Wishlist</Link></li>
            <li><Link href="/products" className="hover:text-gray-400">Shop</Link></li>
          </ul>
        </div>

        {/* Quick Link */}
        <div>
          <h3 className="text-lg font-bold mb-2">Quick Link</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/privacy" className="hover:text-gray-400">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-gray-400">Terms Of Use</Link></li>
            <li><Link href="/faq" className="hover:text-gray-400">FAQ</Link></li>
            <li><Link href="/contact" className="hover:text-gray-400">Contact</Link></li>
          </ul>
        </div>

        {/* Download App */}
        <div>
          <h3 className="text-lg font-bold mb-2">Download App</h3>
          <p className="text-sm mb-2">Save $3 with App New User Only</p>
        
          <div className="flex space-x-4 text-white text-lg">
            <FaFacebookF className="hover:text-gray-400 cursor-pointer" />
            <FaTwitter className="hover:text-gray-400 cursor-pointer" />
            <FaInstagram className="hover:text-gray-400 cursor-pointer" />
            <FaLinkedinIn className="hover:text-gray-400 cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="text-center text-gray-400 text-sm mt-12 border-t border-gray-700 pt-4">
        © Copyright Rimel {currentYear}. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
