"use client";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { twMerge } from "tailwind-merge";
import { Meteors } from "../components/Meteor"; // assuming you import this

function Navigation() {
  return (
    <ul className="nav-ul">
      <li className="nav-li">
        <a href="#home" className="nav-link">
          About
        </a>
      </li>
      <li className="nav-li">
        <a href="#about" className="nav-link">
          Education
        </a>
      </li>
      <li className="nav-li">
        <a href="#work" className="nav-link">
          Experience
        </a>
      </li>
      <li className="nav-li">
        <a href="#projects" className="nav-link">
          Projects
        </a>
      </li>
      <li className="nav-li">
        <a href="#contact" className="nav-link">
          Contact
        </a>
      </li>
    </ul>
  );
}

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10); // triggers after 10px of scrolling
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      initial={{
        backgroundColor: "rgba(0,0,0,0)",
        backdropFilter: "blur(0px)",
      }}
      animate={{
        backgroundColor: isScrolled ? "rgba(11,12,31,0.7)" : "rgba(0,0,0,0)",
        backdropFilter: isScrolled ? "blur(12px)" : "blur(0px)",
      }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className={twMerge(
        "fixed inset-x-0 top-0 z-20 w-full overflow-hidden transition-colors duration-300",
        isScrolled ? "shadow-lg" : ""
      )}
    >
      <div className="relative mx-auto c-space max-w-7xl">
        <div className="absolute inset-0 pointer-events-none">
          <Meteors
            number={100}
            className="opacity-70 before:from-cyan-400 before:via-purple-500 before:to-transparent"
          />
        </div>
        {/* Meteors background */}

        {/* Navbar content */}
        <div className="relative flex items-center justify-between py-4 sm:py-2">
          <a
            href="/"
            className="font-sans z-100 px-4 py-1 rounded-full text-[#E0E0FF] font-bold bg-[#2E1A47] border-2 border-[#ffffff]/50 shadow-[0_0_12px_#c84bff] transition-all duration-300 hover:bg-[#9b4dff]/30 hover:text-[#ffffff] hover:shadow-[0_0_25px_#9b4dff] mt-0.5 text-[1.4rem] tracking-wider relative -translate-y-0.5"
          >
            MARCEL
          </a>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex cursor-pointer text-[#E0E0FF] hover:text-[#d64eff] focus:outline-none sm:hidden"
          >
            <img
              src={isOpen ? "/assets/close.svg" : "/assets/menu.svg"}
              className="w-6 h-6"
              alt="toggle"
            />
          </button>

          {/* Desktop navigation */}
          <nav className="hidden sm:flex">
            <Navigation />
          </nav>
        </div>
      </div>

      {/* Mobile navigation */}
      {isOpen && (
        <motion.div
          className="block overflow-hidden text-center sm:hidden"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ maxHeight: "100vh" }}
          transition={{ duration: 1 }}
        >
          <nav className="pb-5">
            <Navigation />
          </nav>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Navbar;
