"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "motion/react";
import Link from "next/link";
import * as motion from "motion/react-client";
import Magnetic from "./Magnetic";

const IS_AVAILABLE = true;

const links = [
  { name: "Labs", href: "/labs" },
  { name: "Trace", href: "/trace" },
  { name: "Contact", href: "/ping" },
];

const socialLinks = [
  { name: "GitHub", href: "https://github.com/Simo-CE" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/mohamed-ait-ouahmane/" },
  { name: "X", href: "https://x.com/Mohamed31005002" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <div className="relative">
      <header className="w-full z-50 pt-5 pb-3">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center justify-between h-14 rounded-xl bg-[#0e0e11]/60 backdrop-blur-md border border-white/[0.06] px-5">
            <Link href="/" className="flex items-center gap-2 font-mono text-sm group">
              <span className="font-bold text-lg text-primary">M</span>
              <span className="text-white/40 group-hover:text-white/60 transition-colors inline text-xs">
                Mohamed A.
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Magnetic key={link.href} as={motion.div} className="cursor-pointer" dataCursor="sticky">
                    <Link
                      href={link.href}
                      className={`relative px-4 py-2 font-mono text-sm transition-colors duration-200 ${
                        isActive
                          ? "text-primary"
                          : "text-white/40 hover:text-white"
                      }`}
                    >
                      {link.name}
                      {isActive && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute bottom-0 left-4 right-4 h-px bg-primary"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </Link>
                  </Magnetic>
                );
              })}
            </nav>

            <div className="flex items-center gap-4">
              <Link
                href="/ping"
                className="hidden sm:flex items-center gap-2 text-xs font-mono text-white/50 hover:text-white/80 transition-colors"
              >
                <span
                  className={`inline-block w-2 h-2 rounded-full ${
                    IS_AVAILABLE ? "bg-emerald-400" : "bg-white/20"
                  }`}
                  style={
                    IS_AVAILABLE
                      ? { boxShadow: "0 0 8px rgba(52,211,153,0.6)" }
                      : undefined
                  }
                />
                <span>{IS_AVAILABLE ? "Available" : "Unavailable"}</span>
              </Link>

              <button
                className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
              >
                {menuOpen ? (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-white/60"
                  >
                    <path d="M4 4l12 12M16 4L4 16" />
                  </svg>
                ) : (
                  <>
                    <span className="w-5 h-px bg-white/60" />
                    <span className="w-5 h-px bg-white/60" />
                    <span className="w-3.5 h-px bg-white/60" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed top-28 left-0 right-0 z-[60] overflow-hidden"
          >
            <div className="max-w-5xl mx-auto px-6">
              <div className="rounded-xl bg-[#0e0e11]/90 backdrop-blur-md border border-white/[0.06] px-5 py-4">
                <nav className="flex flex-col gap-1">
                  {links.map((link, i) => {
                    const isActive = pathname === link.href;
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06, duration: 0.25 }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setMenuOpen(false)}
                          className={`block py-2 font-mono text-sm transition-colors ${
                            isActive ? "text-primary" : "text-white/40 hover:text-white"
                          }`}
                        >
                          {link.name}
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>

                <div className="border-t border-white/[0.06] mt-3 pt-3 flex items-center gap-5">
                  {socialLinks.map((s, i) => (
                    <motion.a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.18 + i * 0.06, duration: 0.25 }}
                      className="font-mono text-xs text-white/30 hover:text-white/60 transition-colors"
                    >
                      {s.name}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
