"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "motion/react";

function MagneticButton({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({
      x: (e.clientX - (rect.left + rect.width / 2)) * 0.3,
      y: (e.clientY - (rect.top + rect.height / 2)) * 0.3,
    });
  };

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouse}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setPos({ x: 0, y: 0 });
        setHovered(false);
      }}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 500, damping: 50, mass: 1 }}
      className={className}
      data-cursor="interactive"
    >
      <motion.div
        className="absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(184,255,61,0.15), transparent 60%)",
        }}
      />
      <motion.div
        className="absolute inset-0 rounded-xl border border-primary/20 pointer-events-none"
        animate={
          hovered
            ? { scale: [1, 1.06, 1], opacity: [0.4, 0, 0.4] }
            : { scale: 1, opacity: 0 }
        }
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="relative z-10"
        animate={hovered ? { y: [0, 2, 0] } : { y: 0 }}
        transition={{ duration: 0.6, repeat: hovered ? Infinity : 0 }}
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </motion.svg>
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

const handleDownloadPdf = () => {
  const originalTitle = document.title;
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();
  document.title = `Mohamed Ait Ouahmane - CV - ${day}/${month}/${year}`;
  window.print();
  setTimeout(() => {
    document.title = originalTitle;
  }, 1000);
};

function FloatingDownload() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 300);
  });

  return (
    <motion.div
      className="fixed bottom-8 right-8 z-50 print-hidden"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={
        visible
          ? { opacity: 1, scale: 1, y: 0 }
          : { opacity: 0, scale: 0.8, y: 20 }
      }
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <MagneticButton
        onClick={handleDownloadPdf}
        className="relative group flex items-center gap-3 px-5 py-3 rounded-xl border border-white/[0.08] bg-[#0e0e11]/80 backdrop-blur-md font-mono text-sm text-white/70 hover:text-white hover:border-primary/30 transition-colors duration-300 cursor-pointer"
      >
        Download PDF
      </MagneticButton>
    </motion.div>
  );
}

export default function ResumeHeader() {
  return (
    <>
      <FloatingDownload />
      <header className="relative z-10 p-4 sm:p-6 border-b border-white/[0.06] print-hidden">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center text-white/70 hover:text-primary transition-colors font-mono text-xs sm:text-sm group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
            <span className="relative">
              <span className="hidden sm:inline">Back</span>
              <span className="sm:hidden">Back</span>
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
            </span>
          </Link>

          <MagneticButton
            onClick={handleDownloadPdf}
            className="relative group flex items-center gap-2.5 px-4 py-2 rounded-xl border border-white/[0.08] bg-[#0e0e11]/80 backdrop-blur-md font-mono text-xs text-white/60 hover:text-white hover:border-primary/30 transition-colors duration-300 cursor-pointer"
          >
            Download PDF
          </MagneticButton>
        </div>
      </header>
    </>
  );
}
