"use client"
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Home", href: "#" },
    { name: "Your Tasks", href: "#" },
  ];

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-white/10 backdrop-blur-xl border-b border-white/10 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <span className="font-extrabold text-white text-3xl tracking-wide">
          iTask
        </span>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-8 text-white font-medium text-lg">
          {links.map((link) => (
            <li
              key={link.name}
              className="cursor-pointer hover:text-purple-300 transition-colors duration-200"
            >
              {link.name}
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-3xl focus:outline-none"
          onClick={() => setOpen(!open)}
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/10 backdrop-blur-xl border-t border-white/10"
          >
            <ul className="flex flex-col items-center gap-4 py-4 text-white font-medium text-lg">
              {links.map((link) => (
                <li
                  key={link.name}
                  className="cursor-pointer hover:text-purple-300 transition-all"
                  onClick={() => setOpen(false)}
                >
                  {link.name}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
