import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const linksRef = useRef([]);

  useEffect(() => {
    if (open) {
      gsap.to(menuRef.current, {
        duration: 0.6,
        opacity: 1,
        scale: 1,
        ease: "power3.out",
        pointerEvents: "auto",
      });
      gsap.fromTo(
        linksRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
        }
      );
    } else {
      gsap.to(menuRef.current, {
        duration: 0.5,
        opacity: 0,
        scale: 0.95,
        ease: "power3.in",
        pointerEvents: "none",
      });
    }
  }, [open]);

  const scrollToSection = (id) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="fixed top-5 right-6 z-50">
        <button
          onClick={() => setOpen(!open)}
          className="text-white text-3xl focus:outline-none"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      <div
        ref={menuRef}
        className="fixed inset-0 bg-black/95 backdrop-blur-lg flex flex-col items-center justify-center opacity-0 scale-95 pointer-events-none z-40"
      >
        {["hero", "about", "project", "contact"].map((section, i) => (
          <button
            key={section}
            ref={(el) => (linksRef.current[i] = el)}
            onClick={() => scrollToSection(section)}
            className="text-white font-poppins text-3xl md:text-5xl mb-6 hover:text-gray-400 transition-colors"
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </button>
        ))}
      </div>
    </>
  );
};

export default Navbar;
