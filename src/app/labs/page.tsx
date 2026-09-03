"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import PageHeader from "@/lib/components/PageHeader";
import FeaturedProject from "@/lib/components/FeaturedProject";
import LabCard from "@/lib/components/LabCard";
import CaseStudyDrawer from "@/lib/components/CaseStudyDrawer";
import {
  projects,
  getFeaturedProject,
  getProfessionalProjects,
  getOpenSourceProjects,
  getExperimentProjects,
  type LabProject,
} from "@/lib/data/projects";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const sectionLabelVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring" as const, stiffness: 120, damping: 14, delay: 0.1 },
  },
};

export default function LabsPage() {
  const [selectedProject, setSelectedProject] = useState<LabProject | null>(
    null
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const featured = getFeaturedProject();
  const professional = getProfessionalProjects();
  const openSource = getOpenSourceProjects();
  const experiments = getExperimentProjects();

  const handleProjectClick = useCallback((project: LabProject) => {
    setSelectedProject(project);
    setIsDrawerOpen(true);
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setIsDrawerOpen(false);
    setTimeout(() => setSelectedProject(null), 200);
  }, []);

  const totalProjects = projects.length;

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <PageHeader
        title="Labs"
        description="Projects, systems, and engineering work"
        statusText="Active"
        statusInfo={`${totalProjects} projects`}
        accentColor="purple"
        maxWidth="7xl"
      />

      {/* Featured Project */}
      <AnimatePresence mode="wait">
        {featured && (
          <motion.div
            key="featured"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <FeaturedProject
              project={featured}
              onOpen={() => handleProjectClick(featured)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Professional Projects Section */}
      <AnimatePresence mode="wait">
        {professional.length > 0 && (
          <motion.section
            key="professional-section"
            className="relative z-10 px-4 sm:px-6 py-6 sm:py-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="max-w-7xl mx-auto">
              {/* Section label */}
              <motion.div
                className="flex items-center gap-3 mb-6 sm:mb-8"
                variants={sectionLabelVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="h-px flex-1 max-w-[40px] sm:max-w-[60px] bg-gradient-to-r from-transparent to-white/20" />
                <span className="font-mono text-[10px] sm:text-xs text-white/30 uppercase tracking-[0.2em]">
                  Professional Work
                </span>
                <div className="h-px flex-1 max-w-[40px] sm:max-w-[60px] bg-gradient-to-l from-transparent to-white/20" />
              </motion.div>

              {/* Cards grid */}
              <motion.div
                className="grid gap-4 sm:gap-5 md:grid-cols-2"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                {professional.map((project, index) => (
                  <div
                    key={project.id}
                    onClick={() => handleProjectClick(project)}
                    className="cursor-pointer"
                    data-cursor="interactive"
                  >
                    <LabCard project={project} index={index} />
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Open Source Section */}
      <AnimatePresence mode="wait">
        {openSource.length > 0 && (
          <motion.section
            key="opensource-section"
            className="relative z-10 px-4 sm:px-6 py-6 sm:py-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="max-w-7xl mx-auto">
              {/* Section label */}
              <motion.div
                className="flex items-center gap-3 mb-6 sm:mb-8"
                variants={sectionLabelVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="h-px flex-1 max-w-[40px] sm:max-w-[60px] bg-gradient-to-r from-transparent to-white/20" />
                <span className="font-mono text-[10px] sm:text-xs text-white/30 uppercase tracking-[0.2em]">
                  Open Source
                </span>
                <div className="h-px flex-1 max-w-[40px] sm:max-w-[60px] bg-gradient-to-l from-transparent to-white/20" />
              </motion.div>

              {/* Cards grid */}
              <motion.div
                className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                {openSource.map((project, index) => (
                  <div
                    key={project.id}
                    onClick={() => handleProjectClick(project)}
                    className="cursor-pointer"
                    data-cursor="interactive"
                  >
                    <LabCard project={project} index={index} />
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Experiments Section */}
      <AnimatePresence mode="wait">
        {experiments.length > 0 && (
          <motion.section
            key="experiments-section"
            className="relative z-10 px-4 sm:px-6 py-6 sm:py-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="max-w-7xl mx-auto">
              {/* Section label */}
              <motion.div
                className="flex items-center gap-3 mb-6 sm:mb-8"
                variants={sectionLabelVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="h-px flex-1 max-w-[40px] sm:max-w-[60px] bg-gradient-to-r from-transparent to-white/20" />
                <span className="font-mono text-[10px] sm:text-xs text-white/30 uppercase tracking-[0.2em]">
                  Experiments
                </span>
                <div className="h-px flex-1 max-w-[40px] sm:max-w-[60px] bg-gradient-to-l from-transparent to-white/20" />
              </motion.div>

              <motion.div
                className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                {experiments.map((project, index) => (
                  <div
                    key={project.id}
                    onClick={() => handleProjectClick(project)}
                    className="cursor-pointer"
                    data-cursor="interactive"
                  >
                    <LabCard project={project} index={index} />
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Empty state */}
      <AnimatePresence>
        {professional.length === 0 &&
          openSource.length === 0 &&
          experiments.length === 0 && (
            <motion.div
              className="relative z-10 px-4 sm:px-6 py-16 sm:py-24 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <p className="font-mono text-sm text-white/30">
                No projects in this category yet.
              </p>
            </motion.div>
          )}
      </AnimatePresence>

      {/* Bottom spacer */}
      <div className="h-16 sm:h-24" />

      {/* Case Study Drawer */}
      <CaseStudyDrawer
        project={selectedProject}
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
      />
    </div>
  );
}
