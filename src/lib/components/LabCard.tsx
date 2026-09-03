"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { LAB_STATUS_MAP, LAB_STATUS_COLORS } from "@/lib/utils/constants";
import type { LabProject } from "@/lib/data/projects";

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 14 },
  },
};

export default function LabCard({
  project,
  index = 0,
}: {
  project: LabProject;
  index?: number;
}) {
  const statusLabel =
    LAB_STATUS_MAP[project.status] || project.status.toUpperCase();
  const statusColor = LAB_STATUS_COLORS[project.status] || "bg-white/40";

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.08 }}
      whileHover={{
        y: -4,
        transition: { type: "spring" as const, stiffness: 300, damping: 20 },
      }}
      className="relative group h-full bg-black/50 rounded-xl cursor-pointer"
      data-cursor="interactive"
    >
      {/* Hover glow */}
      <div
        className="absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${project.accentColor}30, transparent 60%)`,
        }}
      />

      <div
        className="relative h-full rounded-xl border border-white/[0.06] group-hover:border-white/[0.15] transition-all duration-300 overflow-hidden"
        style={{
          background: `linear-gradient(160deg, ${project.accentColor}06 0%, transparent 50%)`,
        }}
      >
        {/* Corner accent */}
        <div
          className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at top right, ${project.accentColor}10, transparent 70%)`,
          }}
        />

        <div className="relative p-5 sm:p-6 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-start justify-between mb-3 sm:mb-4">
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "w-2 h-2 rounded-full animate-pulse",
                  statusColor
                )}
              />
              <span className="font-mono text-[10px] sm:text-xs text-white/40 uppercase tracking-wider">
                {statusLabel}
              </span>
            </div>
            <span className="font-mono text-[10px] sm:text-xs text-white/20">
              {project.year}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg sm:text-xl font-bold mb-1.5 group-hover:text-white transition-colors duration-200">
            <span
              className="transition-colors duration-200"
              style={{ color: "inherit" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color =
                  project.accentColor;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "";
              }}
            >
              {project.title}
            </span>
          </h3>

          {/* Tagline */}
          <p
            className="text-xs sm:text-sm font-mono mb-3"
            style={{ color: `${project.accentColor}99` }}
          >
            {project.tagline}
          </p>

          {/* Description */}
          <p className="text-xs sm:text-sm text-white/45 leading-relaxed mb-4 flex-1 line-clamp-3">
            {project.description}
          </p>

          {/* Tech stack pills */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.techStack.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded font-mono text-[10px] border border-white/[0.06] bg-white/[0.03] text-white/40 group-hover:text-white/60 transition-colors duration-200"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 5 && (
              <span className="px-2 py-0.5 rounded font-mono text-[10px] text-white/25">
                +{project.techStack.length - 5}
              </span>
            )}
          </div>

          {/* Footer: role + click affordance */}
          <div className="flex items-center justify-between pt-3 border-t border-white/[0.04]">
            <span className="font-mono text-[10px] sm:text-xs text-white/30">
              {project.role}
            </span>

            {/* View details indicator — appears on hover */}
            <div
              className="flex items-center gap-1 font-mono text-[10px] opacity-0 group-hover:opacity-100 transition-all duration-200"
              style={{ color: `${project.accentColor}80` }}
            >
              <span>Details</span>
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
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
