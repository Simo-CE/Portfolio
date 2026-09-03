"use client";

import Link from "next/link";
import Navbar from "@/lib/components/Navbar";
import * as motion from "motion/react-client";

const infoItems = [
  { label: "Experience", value: "+4 Years" },
  { label: "Companies", value: "5" },
  { label: "Focus", value: "DApps & DeFi" },
  { label: "Contracts", value: "Solidity" },
  { label: "Nostr NIPs", value: "16" },
  { label: "Learning", value: "∞" },
];

export default function Home() {
  return (
    <main className="h-screen flex flex-col overflow-hidden">
      <Navbar />

      <section className="flex-1 w-full max-w-5xl mx-auto px-6 flex items-center">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-12 md:gap-20 w-full">
          {/* Left: Pitch */}
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-6"
            >
              <span className="inline-flex items-center px-3 py-1 rounded-full border border-teal/30 text-teal font-mono text-xs">
                Decentralized Systems Engineer
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.5 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6"
            >
              I build digital products end to end
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16, duration: 0.5 }}
              className="text-base sm:text-lg text-white/50 leading-relaxed max-w-lg"
            >
              From marketplace platforms to decentralized applications, I design
              and build the full picture — interface, systems, and
              infrastructure. Focused on Bitcoin-native products and open
              protocols.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24, duration: 0.5 }}
              className="flex flex-wrap gap-3 mt-8"
            >
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/labs"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-teal/30 text-white font-mono text-sm font-medium hover:brightness-110 hover:shadow-[0_0_24px_rgba(20,184,166,0.25)] transition-all"
                >
                  View Projects
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/ping"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/[0.1] text-white/70 font-mono text-sm hover:border-white/[0.2] hover:text-white transition-all"
                >
                  Get in Touch
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Right: Info Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
            transition={{ delay: 0.35, duration: 0.6, ease: "easeOut" }}
            className="hidden md:block w-full max-w-md flex-shrink-0"
          >
            <div className="relative rounded-2xl border border-teal/20 overflow-hidden p-8 bg-gradient-to-br from-teal/10 via-teal/5 to-transparent">
              {/* Dot grid overlay */}
              <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, var(--teal) 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />
  
              <motion.div
                className="relative grid grid-cols-2 gap-x-8 gap-y-6"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.06, delayChildren: 0.4 },
                  },
                }}
              >
                {infoItems.map((item) => (
                  <motion.div
                    key={item.label}
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
                    }}
                  >
                    <div className="font-mono text-[11px] text-teal/60 uppercase tracking-wider mb-1.5">
                      {item.label}
                    </div>
                    <div
                      className={`font-bold text-white/90 ${
                        item.value === "∞"
                          ? "text-4xl"
                          : "text-xl"
                      }`}
                    >
                      {item.value}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full max-w-5xl mx-auto px-6 py-5 border-t border-white/[0.06]">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] text-white/75">
            © 2026 Mohamed A.
          </span>
          <div className="flex items-center gap-4">
            {[
              { name: "Resume", href: "/resume" },
              { name: "GitHub", href: "https://github.com/Simo-CE" },
              {
                name: "LinkedIn",
                href: "https://www.linkedin.com/in/mohamed-ait-ouahmane/",
              },
              { name: "X", href: "https://x.com/Mohamed31005002" },
            ].map((s) => (
              <Link
                key={s.name}
                href={s.href}
                {...s.href === "/resume" ? {} : { target: "_blank" }}
                rel="noopener noreferrer"
                className="font-mono text-[11px] text-white/75 hover:text-white/60 transition-colors"
              >
                {s.name}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
