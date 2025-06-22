import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-500 to-purple-700 text-white pt-10 pb-6 relative z-40">
      <div className="border-t border-white/20 mb-6 mx-6 sm:mx-14"></div>

      <div className="container mx-auto px-6 lg:px-14 flex flex-col lg:flex-row justify-between items-center gap-6">

        {/* Project Name and Tagline */}
        <div className="text-center lg:text-left">
          <h2 className="text-3xl font-extrabold mb-2 tracking-tight">PrivURL</h2>
          <p className="text-sm text-white/90 max-w-xs">
            Simplifying link management with reliable analytics and seamless sharing.
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-5">
          <a href="#" className="hover:text-white/80 transition-all duration-200" aria-label="Facebook">
            <FaFacebook size={22} />
          </a>
          <a href="#" className="hover:text-white/80 transition-all duration-200" aria-label="Twitter">
            <FaTwitter size={22} />
          </a>
          <a href="#" className="hover:text-white/80 transition-all duration-200" aria-label="Instagram">
            <FaInstagram size={22} />
          </a>
          <a
            href="https://www.linkedin.com/feed/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white/80 transition-all duration-200"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={22} />
          </a>
        </div>

        {/* Developer Note */}
        <div className="text-sm text-white/80 text-center lg:text-right">
          <p>
            Built with ❤️ by <a
              href="https://www.linkedin.com/feed/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white"
            >
              Mehul Jain
            </a>
          </p>
          <p>&copy; {new Date().getFullYear()} PrivURL. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
