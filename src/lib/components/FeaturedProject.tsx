"use client";

import { useMemo } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { LAB_STATUS_MAP, LAB_STATUS_COLORS } from "@/lib/utils/constants";
import { useLinkValidation } from "@/lib/hooks/useLinkValidation";
import type { LabProject } from "@/lib/data/projects";

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 14 },
  },
};

export default function FeaturedProject({
  project,
  onOpen,
}: {
  project: LabProject;
  onOpen: () => void;
}) {
  const statusLabel =
    LAB_STATUS_MAP[project.status] || project.status.toUpperCase();
  const statusColor = LAB_STATUS_COLORS[project.status] || "bg-white/40";

  const linkUrls = useMemo(
    () => project.links.map((l) => l.url),
    [project.links]
  );
  const { validLinks } = useLinkValidation(linkUrls);
  const validatedLinks = project.links.filter((link) =>
    validLinks.includes(link.url)
  );

  const visibleTech = project.techStack.slice(0, 6);
  const remainingTech = project.techStack.length - visibleTech.length;

  return (
    <motion.section
      className="relative z-10 px-4 sm:px-6 py-6 sm:py-8"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-3 mb-4 sm:mb-5"
        >
          <div className="h-px flex-1 max-w-[40px] sm:max-w-[60px] bg-gradient-to-r from-transparent to-white/20" />
          <span className="font-mono text-[10px] sm:text-xs text-white/30 uppercase tracking-[0.2em]">
            Featured Project
          </span>
          <div className="h-px flex-1 max-w-[40px] sm:max-w-[60px] bg-gradient-to-l from-transparent to-white/20" />
        </motion.div>

        {/* Card wrapper — provides the glow effect on hover */}
        <motion.div
          variants={itemVariants}
          className="relative group cursor-pointer bg-black/40"
          onClick={onOpen}
          data-cursor="interactive"
          whileHover={{ y: -3, transition: { duration: 0.2 } }}
        >
          {/* Hover glow — matches LabCard pattern */}
          <div
            className="absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm pointer-events-none"
            style={{
              background: `linear-gradient(135deg, ${project.accentColor}30, transparent 60%)`,
            }}
          />

          {/* Card content */}
          <div
            className="relative rounded-xl border border-white/[0.08] group-hover:border-white/[0.15] overflow-hidden transition-colors duration-300"
            style={{
              background: `linear-gradient(160deg, ${project.accentColor}06 0%, #0e0e11 40%, ${project.accentColor}03 100%)`,
            }}
          >
            {/* Grid overlay */}
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage: `linear-gradient(${project.accentColor}40 1px, transparent 1px), linear-gradient(90deg, ${project.accentColor}40 1px, transparent 1px)`,
                backgroundSize: "40px 40px",
              }}
            />

            {/* Corner accent — matches LabCard */}
            <div
              className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: `radial-gradient(circle at top right, ${project.accentColor}12, transparent 70%)`,
              }}
            />

            {/* Glow orb */}
            <div
              className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[80px] opacity-[0.06] group-hover:opacity-[0.1] transition-opacity duration-500 pointer-events-none"
              style={{ background: project.accentColor }}
            />

            <div className="relative p-5 sm:p-6 md:p-8">
              {/* Top row: status + year + role */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <div
                      className={cn(
                        "w-2 h-2 rounded-full animate-pulse",
                        statusColor
                      )}
                    />
                    <span className="font-mono text-[10px] sm:text-xs text-white/50 uppercase tracking-wider">
                      {statusLabel}
                    </span>
                  </div>
                  <span className="text-white/20">·</span>
                  <span className="font-mono text-[10px] sm:text-xs text-white/30">
                    {project.year}
                  </span>
                  {project.company && (
                    <>
                      <span className="text-white/20">·</span>
                      <span className="font-mono text-[10px] sm:text-xs text-white/30">
                        {project.company}
                      </span>
                    </>
                  )}
                </div>

                <div
                  className="px-2.5 py-1 rounded-md font-mono text-[10px] border"
                  style={{
                    color: project.accentColor,
                    borderColor: `${project.accentColor}30`,
                    background: `${project.accentColor}10`,
                  }}
                >
                  {project.role}
                </div>
              </div>

              {/* Title + tagline */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight mb-1.5">
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${project.accentColor}, ${project.accentColor}aa, white)`,
                  }}
                >
                  {project.title}
                </span>
              </h2>

              <p
                className="text-sm sm:text-base font-mono font-medium mb-4"
                style={{ color: `${project.accentColor}cc` }}
              >
                {project.tagline}
              </p>

              {/* Short description */}
              <p className="text-sm text-white/45 leading-relaxed max-w-3xl mb-5 line-clamp-2">
                {project.description}
              </p>

              {/* Metrics — compact row */}
              {project.metrics.length > 0 && (
                <div className="flex flex-wrap gap-3 sm:gap-4 mb-5">
                  {project.metrics.slice(0, 4).map((metric) => (
                    <div key={metric.label} className="min-w-0">
                      <span
                        className="text-sm sm:text-base font-bold font-mono"
                        style={{ color: project.accentColor }}
                      >
                        {metric.value}
                      </span>
                      <span className="text-[10px] font-mono text-white/30 uppercase tracking-wider ml-1.5">
                        {metric.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Tech stack preview + CTA row */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/[0.06]">
                <div className="flex flex-wrap gap-1.5">
                  {visibleTech.map((tech) => (
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
                  {remainingTech > 0 && (
                    <span className="px-2 py-0.5 rounded font-mono text-[10px] text-white/25">
                      +{remainingTech}
                    </span>
                  )}
                </div>

                {/* View details affordance */}
                <div
                  className="flex items-center gap-1.5 font-mono text-[10px] sm:text-xs transition-all duration-200 group-hover:gap-2.5"
                  style={{ color: `${project.accentColor}80` }}
                >
                  <span>View details</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* Links — styled as distinct interactive elements */}
                <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-white/[0.04] min-h-8">
                  {validatedLinks.length > 0 && validatedLinks.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-mono text-[10px] sm:text-[11px] border transition-all duration-200 hover:-translate-y-px"
                      style={{
                        color: `${project.accentColor}bb`,
                        borderColor: `${project.accentColor}20`,
                        background: `${project.accentColor}06`,
                      }}
                      onClick={(e) => e.stopPropagation()}
                      data-cursor="interactive"
                    >
                      {link.label}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="9"
                        height="9"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="opacity-60"
                      >
                        <path d="M15 3h6v6" />
                        <path d="M10 14 21 3" />
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      </svg>
                    </a>
                  ))}
                </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
