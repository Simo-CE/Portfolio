"use client";

import { motion } from "motion/react";
import { containerVariants, itemVariants } from "@/lib/utils/variants";
import Link from "next/link";

export default function ContactInfo() {
  return (
    <motion.div
      className="space-y-6 sm:space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <div className="flex items-center gap-3 mb-4 sm:mb-6">
          <div className="w-1 h-6 bg-gradient-to-b from-pink-400 to-purple-400" />
          <h2 className="text-xl sm:text-2xl font-bold">Direct Channels</h2>
        </div>
        <div className="flex flex-row justify-between gap-2">
          <Link
            href="mailto:contact@dooma.dev"
            className="text-white text-sm sm:text-base break-all bg-black/50 border border-white/10 transition-colors rounded-md px-3 sm:px-4 py-2 w-full"
          >
            contact@dooma.dev
          </Link>

          <Link
            href="tel:+212643208333"
            className="text-white text-sm sm:text-base break-all bg-black/50 border border-white/10 transition-colors rounded-md px-3 sm:px-4 py-2 w-full"
          >
            +212 643 208333
          </Link>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <div className="flex items-center gap-3 mb-3 sm:mb-4">
          <div className="w-1 h-6 bg-gradient-to-b from-pink-400 to-purple-400" />
          <h3 className="text-lg sm:text-xl font-bold">Social Links</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <a
            href="https://github.com/Simo-CE"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium border bg-transparent border-white/20 hover:border-white/50 sm:text-sm px-4 py-2 h-10 transition-all duration-200"
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
              className="w-3 h-3 sm:w-4 sm:h-4 mr-2"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
            <span className="truncate">Simo-CE</span>
          </a>

          <a
            href="https://www.linkedin.com/in/mohamed-ait-ouahmane/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium border bg-transparent border-white/20 hover:border-[#0077B5]/50 sm:text-sm px-4 py-2 h-10 transition-all duration-200"
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
              className="w-3 h-3 sm:w-4 sm:h-4 mr-2"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect width="4" height="12" x="2" y="9" />
              <circle cx="4" cy="4" r="2" />
            </svg>
            <span className="truncate">Mohamed.linkedin</span>
          </a>

          <a
            href="https://primal.net/p/nprofile1qqsgu54kzddf2ce6xvga90pt0j0wytftjm6sngzhsdyxgcd3eh3xz2sf9fl6a"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium border bg-transparent border-white/20 hover:border-[#796ab1]/50 sm:text-sm px-4 py-2 h-10 transition-all duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 48 48"
              className="w-6 h-6 mr-2"
            >
              <circle
                cx="24"
                cy="24"
                r="21.5"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
              />
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M45.5 24c0 6.877-5.574 12.45-12.45 12.45s-12.452-3.324-12.452-10.2c0-5.512 4.417-8.203 9.42-8.484c-12.56-3.869-16.57 4.362-16.57 11.832S20.093 43 27.856 45.154"
                strokeWidth="1"
              />
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.448 29.598c0-12.112 5.637-14.608 10.519-15.16c-8.406-1.102-19.705 3.015-16.191 23.667"
                strokeWidth="1"
              />
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.575 17.943c6.903-6.888 18.466-7.616 21.998-.943c-4.732-11.234-20.433-13.196-29.67-.651"
                strokeWidth="1"
              />
            </svg>
            <span className="truncate">Mohamed.primal</span>
          </a>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <div className="flex items-center gap-3 mb-3 sm:mb-4">
          <div className="w-1 h-6 bg-gradient-to-b from-pink-400 to-purple-400" />
          <h3 className="text-lg sm:text-xl font-bold">Availability</h3>
        </div>
        <div className="bg-black/50 border border-white/10 rounded-md">
          <div className="p-3 sm:p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="font-mono text-xs sm:text-sm text-green-400">
                Online
              </span>
            </div>
            <p className="text-white/70 text-xs sm:text-sm">
              Available for collaborations, and interesting conversations.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
