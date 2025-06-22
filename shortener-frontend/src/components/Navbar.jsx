import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoIosMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useStoreContext } from "../contextApi/ContextApi";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken } = useStoreContext();
  const path = useLocation().pathname;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("JWT_TOKEN");
    navigate("/login");
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    ...(token ? [{ to: "/dashboard", label: "Dashboard" }] : []),
  ];

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 to-purple-600 h-16 flex items-center shadow-sm">
      <div className="container mx-auto px-4 flex justify-between items-center w-full">
        <Link to="/">
          <h1 className="text-white text-2xl font-bold italic">PrivURL</h1>
        </Link>

        <div className="sm:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white text-3xl">
            {isMenuOpen ? <RxCross2 /> : <IoIosMenu />}
          </button>
        </div>

        <ul
          className={`sm:flex sm:items-center gap-6 absolute sm:static w-full sm:w-auto left-0 transition-all duration-200 ease-in-out sm:h-auto overflow-hidden sm:overflow-visible ${
            isMenuOpen ? "top-16 bg-gradient-to-r from-blue-600 to-purple-600 py-4 px-4" : "top-[-400px]"
          }`}
        >
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                className={`text-white font-medium hover:underline underline-offset-4 transition ${
                  path === to ? "underline underline-offset-4 font-semibold" : ""
                }`}
              >
                {label}
              </Link>
            </li>
          ))}

          {!token ? (
            <li>
              <Link
                to="/register"
                className="text-white bg-rose-600 px-4 py-2 rounded-md font-medium hover:bg-rose-700 transition"
              >
                Sign Up
              </Link>
            </li>
          ) : (
            <li>
              <button
                onClick={handleLogout}
                className="text-white bg-rose-600 px-4 py-2 rounded-md font-medium hover:bg-rose-700 transition"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
