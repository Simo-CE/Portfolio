"use client";

import { useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { LAB_STATUS_MAP, LAB_STATUS_COLORS } from "@/lib/utils/constants";
import { useLinkValidation } from "@/lib/hooks/useLinkValidation";
import type { LabProject } from "@/lib/data/projects";

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

const drawerVariants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 30 },
  },
  exit: {
    x: "100%",
    transition: { duration: 0.2, ease: "easeIn" as const },
  },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 120, damping: 14 },
  },
};

const MetricCard = ({
  label,
  value,
  accentColor,
}: {
  label: string;
  value: string;
  accentColor: string;
}) => (
  <div className="p-3 rounded-lg border border-white/[0.06] bg-white/[0.02] min-w-0">
    <div
      className="text-base sm:text-lg font-bold font-mono truncate"
      style={{ color: accentColor }}
      title={value}
    >
      {value}
    </div>
    <div className="text-[10px] font-mono text-white/30 uppercase tracking-wider mt-0.5 leading-tight">
      {label}
    </div>
  </div>
);

export default function CaseStudyDrawer({
  project,
  isOpen,
  onClose,
}: {
  project: LabProject | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  const linkUrls = useMemo(
    () => (project?.links ?? []).map((l) => l.url),
    [project?.links]
  );
  const { validLinks } = useLinkValidation(isOpen ? linkUrls : []);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  const statusLabel =
    LAB_STATUS_MAP[project.status] || project.status.toUpperCase();
  const statusColor = LAB_STATUS_COLORS[project.status] || "bg-white/40";

  const validatedLinks = project.links.filter((link) =>
    validLinks.includes(link.url)
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            className="fixed top-0 right-0 z-50 h-full border-l border-white/[0.08] overflow-y-auto overflow-x-hidden overscroll-contain scrollbar-thin"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              width: "min(100vw, clamp(480px, 70vw, 1200px))",
              background: `linear-gradient(160deg, ${project.accentColor}06 0%, #0e0e11 20%, #0e0e11 100%)`,
            }}
          >
            {/* Glow */}
            <div
              className="absolute -top-32 -right-32 w-64 h-64 rounded-full blur-[100px] opacity-[0.06] pointer-events-none"
              style={{ background: project.accentColor }}
            />

            {/* Sticky close bar */}
            <div className="sticky top-0 z-10 flex items-center justify-between px-5 sm:px-8 py-4 border-b border-white/[0.06] backdrop-blur-md bg-[#0e0e11]/80">
              <div className="flex items-center gap-2 min-w-0">
                <div
                  className={cn(
                    "w-2 h-2 rounded-full animate-pulse flex-shrink-0",
                    statusColor
                  )}
                />
                <span className="font-mono text-xs text-white/50 uppercase tracking-wider truncate">
                  {project.title}
                </span>
              </div>
              <motion.button
                className="w-8 h-8 rounded-lg border border-white/10 bg-white/[0.03] flex items-center justify-center text-white/50 hover:text-white hover:border-white/20 transition-colors flex-shrink-0"
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                data-cursor="interactive"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </motion.button>
            </div>

            {/* Content */}
            <motion.div
              className="relative px-5 sm:px-8 py-6 sm:py-8"
              variants={stagger}
              initial="hidden"
              animate="visible"
            >
              {/* Header */}
              <motion.div variants={fadeUp} className="mb-6">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <div className="flex items-center gap-1.5">
                    <div
                      className={cn(
                        "w-2 h-2 rounded-full animate-pulse",
                        statusColor
                      )}
                    />
                    <span className="font-mono text-[10px] text-white/50 uppercase tracking-wider">
                      {statusLabel}
                    </span>
                  </div>
                  <span className="text-white/20">·</span>
                  <span className="font-mono text-[10px] text-white/30">
                    {project.year}
                  </span>
                  {project.company && (
                    <>
                      <span className="text-white/20">·</span>
                      <span className="font-mono text-[10px] text-white/30">
                        {project.company}
                      </span>
                    </>
                  )}
                </div>

                <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage: `linear-gradient(135deg, ${project.accentColor}, white)`,
                    }}
                  >
                    {project.title}
                  </span>
                </h2>

                <p
                  className="text-sm sm:text-base font-mono"
                  style={{ color: `${project.accentColor}cc` }}
                >
                  {project.tagline}
                </p>

                <div
                  className="inline-block mt-3 px-3 py-1 rounded-md font-mono text-[10px] border"
                  style={{
                    color: project.accentColor,
                    borderColor: `${project.accentColor}30`,
                    background: `${project.accentColor}10`,
                  }}
                >
                  {project.role}
                </div>
              </motion.div>

              {/* Description */}
              <motion.div variants={fadeUp} className="mb-6">
                <h3 className="font-mono text-[10px] text-white/30 uppercase tracking-[0.15em] mb-3">
                  Overview
                </h3>
                <p className="text-sm text-white/50 leading-relaxed whitespace-pre-line">
                  {project.longDescription}
                </p>
              </motion.div>

              {/* Metrics */}
              {project.metrics.length > 0 && (
                <motion.div
                  variants={fadeUp}
                  className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-6"
                >
                  {project.metrics.map((metric) => (
                    <MetricCard
                      key={metric.label}
                      label={metric.label}
                      value={metric.value}
                      accentColor={project.accentColor}
                    />
                  ))}
                </motion.div>
              )}

              {/* Architecture */}
              {project.architecture.length > 0 && (
                <motion.div variants={fadeUp} className="mb-6">
                  <h3 className="font-mono text-[10px] text-white/30 uppercase tracking-[0.15em] mb-4">
                    Architecture
                  </h3>
                  <div className="space-y-2.5">
                    {project.architecture.map((node, i) => (
                      <div
                        key={node.label}
                        className="flex gap-3 items-start p-3 rounded-lg border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.03] transition-colors"
                      >
                        <div
                          className="w-6 h-6 rounded-md flex items-center justify-center font-mono text-[10px] font-bold flex-shrink-0"
                          style={{
                            color: project.accentColor,
                            background: `${project.accentColor}15`,
                            border: `1px solid ${project.accentColor}25`,
                          }}
                        >
                          {i + 1}
                        </div>
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-0.5">
                            <span className="text-xs font-bold text-white/80 font-mono">
                              {node.label}
                            </span>
                            <span
                              className="text-[10px] px-1.5 py-0.5 rounded font-mono"
                              style={{
                                color: `${project.accentColor}aa`,
                                background: `${project.accentColor}10`,
                              }}
                            >
                              {node.tech}
                            </span>
                          </div>
                          <p className="text-[11px] text-white/40 leading-relaxed">
                            {node.role}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Highlights */}
              {project.highlights.length > 0 && (
                <motion.div variants={fadeUp} className="mb-6">
                  <h3 className="font-mono text-[10px] text-white/30 uppercase tracking-[0.15em] mb-4">
                    Key Contributions
                  </h3>
                  <ul className="space-y-2">
                    {project.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2.5">
                        <span
                          className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: project.accentColor }}
                        />
                        <span className="text-xs text-white/50 leading-relaxed">
                          {h}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Tech Stack */}
              <motion.div variants={fadeUp} className="mb-6">
                <h3 className="font-mono text-[10px] text-white/30 uppercase tracking-[0.15em] mb-3">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded font-mono text-[10px] border"
                      style={{
                        color: `${project.accentColor}cc`,
                        borderColor: `${project.accentColor}20`,
                        background: `${project.accentColor}08`,
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Links — only render validated links */}
              {validatedLinks.length > 0 && (
                <motion.div
                  variants={fadeUp}
                  className="flex flex-wrap gap-2.5 pt-5 border-t border-white/[0.06]"
                >
                  {validatedLinks.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono text-[11px] border transition-all duration-200 hover:-translate-y-0.5"
                      style={{
                        color: project.accentColor,
                        borderColor: `${project.accentColor}30`,
                        background: `${project.accentColor}08`,
                      }}
                      data-cursor="interactive"
                    >
                      {link.label}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M15 3h6v6" />
                        <path d="M10 14 21 3" />
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      </svg>
                    </a>
                  ))}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
