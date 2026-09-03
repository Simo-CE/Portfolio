"use client";

import { motion } from "motion/react";
import ContactForm from "@/lib/components/ContactForm";
import PageHeader from "@/lib/components/PageHeader";
import ContactInfo from "@/lib/components/ContactInfo";
import { containerVariants, itemVariants } from "@/lib/utils/variants";

export default function Ping() {
  return (
    <motion.div
      className="text-white relative"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <PageHeader
        title="Contact"
        description="Get in touch"
        statusText="ONLINE"
        statusInfo="RESPONSE TIME: ~24H"
        accentColor="pink"
      />

      <main className="relative z-10 p-4 sm:p-6">
        <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact form */}
          <motion.div className="order-1" variants={itemVariants}>
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-transparent to-white/20" />
              <span className="font-mono text-[10px] sm:text-xs text-white/30 uppercase tracking-[0.2em]">
                Send a Message
              </span>
              <div className="h-px flex-1 max-w-[60px] bg-gradient-to-l from-transparent to-white/20" />
            </div>
            <ContactForm />
          </motion.div>

          {/* Contact info and social */}
          <motion.div className="order-2" variants={itemVariants}>
            <ContactInfo />
          </motion.div>
        </div>
      </main>
    </motion.div>
  );
}
