"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Layers, Monitor, HardHat, Settings, Store } from "lucide-react";
import {
  timelineEvents,
  communities,
  stats,
  profileLinks,
} from "@/lib/utils/timeline";
import {
  containerVariants,
  itemVariants,
  statsVariants,
} from "@/lib/utils/variants";
import PageHeader from "@/lib/components/PageHeader";

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  Layers,
  Monitor,
  HardHat,
  Settings,
  Store,
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 16 },
  },
};

export default function TracePage() {
  const [hoveredEvent, setHoveredEvent] = useState<number | null>(null);

  return (
    <motion.div
      className="min-h-screen text-white relative"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header */}
      <PageHeader
        title="Trace"
        description="Career timeline and engineering journey"
        statusText="Traced"
        statusInfo={`${timelineEvents.length} milestones`}
        accentColor="orange"
      />

      <main className="relative z-10 p-6">
        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <motion.div
              className="absolute left-6 sm:left-7 top-0 bottom-0 w-px"
              style={{
                background: `linear-gradient(to bottom, ${timelineEvents[0]?.accentColor || "#f97316"}40, ${timelineEvents[timelineEvents.length - 1]?.accentColor || "#a855f7"}40)`,
              }}
              initial={{ height: 0, opacity: 0 }}
              whileInView={{ height: "100%", opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.2 }}
            />

            {/* Timeline events */}
            <div className="space-y-6">
              {timelineEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  className="relative flex items-start gap-4 sm:gap-6"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: { staggerChildren: 0.1, delayChildren: index * 0.05 },
                    },
                  }}
                  onMouseEnter={() => setHoveredEvent(event.id)}
                  onMouseLeave={() => setHoveredEvent(null)}
                >
                  {/* Timeline dot */}
                  <motion.div
                    className="relative z-10 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full flex-shrink-0 bg-[#0e0e11] border-2"
                    style={{
                      borderColor: `${event.accentColor}60`,
                      color: event.accentColor,
                    }}
                    animate={
                      hoveredEvent === event.id
                        ? {
                            scale: 1.1,
                            borderColor: event.accentColor,
                            boxShadow: `0 0 24px ${event.accentColor}50`,
                          }
                        : {
                            scale: 1,
                            borderColor: `${event.accentColor}60`,
                            boxShadow: `0 0 0px transparent`,
                          }
                    }
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {(() => {
                      const IconComponent = iconMap[event.icon];
                      return IconComponent ? <IconComponent size={20} /> : null;
                    })()}
                  </motion.div>

                  {/* Event card */}
                  <motion.div
                    className="flex-1 min-w-0"
                    variants={cardVariants}
                  >
                    <div
                      className="relative rounded-xl border overflow-hidden transition-all duration-300 group"
                      style={{
                        borderColor:
                          hoveredEvent === event.id
                            ? `${event.accentColor}40`
                            : "rgba(255,255,255,0.06)",
                        background: `linear-gradient(135deg, ${event.accentColor}04 0%, rgba(14,14,17,0.8) 50%)`,
                      }}
                    >
                      {/* Accent bar */}
                      <div
                        className="absolute left-0 top-0 bottom-0 w-1 transition-all duration-300"
                        style={{
                          background: `linear-gradient(to bottom, ${event.accentColor}, ${event.accentColor}40)`,
                          opacity: hoveredEvent === event.id ? 1 : 0.4,
                        }}
                      />

                      {/* Corner glow */}
                      <div
                        className="absolute -top-12 -right-12 w-24 h-24 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{ background: `${event.accentColor}15` }}
                      />

                      <div className="relative p-5 sm:p-6 pl-6 sm:pl-7">
                        {/* Top row: date + company */}
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span
                            className="font-mono text-xs font-bold px-2 py-0.5 rounded"
                            style={{
                              color: event.accentColor,
                              background: `${event.accentColor}15`,
                            }}
                          >
                            {event.year}
                          </span>
                          <span className="text-white/20">·</span>
                          <span className="font-mono text-xs text-white/50">
                            {event.company}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-lg sm:text-xl font-bold mb-2 text-white/90 group-hover:text-white transition-colors">
                          {event.title}
                        </h3>

                        {/* Description */}
                        <p className="text-sm text-white/45 leading-relaxed mb-4">
                          {event.description}
                        </p>

                        {/* Tech stack */}
                        <div className="flex flex-wrap gap-1.5">
                          {event.tech.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-0.5 rounded font-mono text-[10px] border transition-colors duration-200"
                              style={{
                                color: `${event.accentColor}aa`,
                                borderColor: `${event.accentColor}15`,
                                background: `${event.accentColor}06`,
                              }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Link */}
                        {event.link && (
                          <a
                            href={event.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 mt-4 font-mono text-xs transition-all duration-200 hover:gap-2.5"
                            style={{ color: `${event.accentColor}90` }}
                            data-cursor="interactive"
                          >
                            Visit
                            <svg
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
                        )}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <motion.div
          className="max-w-4xl mx-auto mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="flex items-center gap-3 mb-8"
            variants={itemVariants}
          >
            <div className="w-1 h-8 bg-gradient-to-b from-cyan-400 to-blue-400" />
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-cyan-400"
              >
                <path d="M3 3v16a2 2 0 0 0 2 2h16" />
                <path d="M18 17V9" />
                <path d="M13 17V5" />
                <path d="M8 17v-3" />
              </svg>
              Stats
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={statsVariants}
                whileHover="hover"
                custom={index}
              >
                <div className="rounded-lg border bg-black/50 border-white/[0.06] text-center p-4 hover:border-white/[0.12] transition-colors duration-300">
                  <motion.div
                    className={`text-2xl md:text-3xl font-bold ${stat.color} mb-1`}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.08,
                      type: "spring",
                      stiffness: 200,
                    }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="font-mono text-[10px] text-white/40 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Communities */}
        <motion.div
          className="max-w-4xl mx-auto mt-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="flex items-center gap-3 mb-8"
            variants={itemVariants}
          >
            <div className="w-1 h-8 bg-gradient-to-b from-purple-400 to-pink-400" />
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-purple-400"
              >
                <path d="M18 21a8 8 0 0 0-16 0" />
                <circle cx="10" cy="8" r="5" />
                <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3" />
              </svg>
              Communities
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {communities.map((community) => (
              <motion.div
                key={community}
                variants={itemVariants}
                whileHover={{ scale: 1.04, y: -2 }}
              >
                <div className="rounded-lg border bg-black/50 border-white/[0.06] hover:border-purple-500/30 transition-all duration-300 group cursor-pointer p-4 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full mx-auto mb-2 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" />
                    </div>
                    <h3 className="font-mono text-xs text-white/60 group-hover:text-white/90 transition-colors duration-300">
                      {community}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Links */}
        <motion.div
          className="max-w-4xl mx-auto mt-16 mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="flex items-center gap-3 mb-8"
            variants={itemVariants}
          >
            <div className="w-1 h-8 bg-gradient-to-b from-green-400 to-emerald-400" />
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-green-400"
              >
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
              Links
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {profileLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                whileHover={{ scale: 1.03, y: -2 }}
                className="rounded-lg border bg-black/50 border-white/[0.06] hover:border-white/[0.12] transition-all duration-300 p-4 text-center group"
                data-cursor="interactive"
              >
                <div
                  className={`font-mono text-sm font-bold ${link.color} opacity-80 group-hover:opacity-100 transition-opacity mb-1`}
                >
                  {link.label}
                </div>
                <div className="font-mono text-[10px] text-white/25 group-hover:text-white/40 transition-colors truncate">
                  {new URL(link.url).hostname}
                </div>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </main>
    </motion.div>
  );
}
