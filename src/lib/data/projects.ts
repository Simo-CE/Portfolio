export type ProjectStatus =
  | "production"
  | "discontinued"
  | "private"
  | "open-source"
  | "experimental";

export type ProjectCategory = "professional" | "open-source" | "experiment";

export interface ProjectMetric {
  label: string;
  value: string;
  icon?: string;
}

export interface ProjectLink {
  label: string;
  url: string;
  type: "live" | "repo" | "npm" | "case-study" | "demo" | "download";
}

export interface ArchitectureNode {
  label: string;
  tech: string;
  role: string;
}

export interface LabProject {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  status: ProjectStatus;
  category: ProjectCategory;
  role: string;
  year: string;
  company?: string;
  techStack: string[];
  architecture: ArchitectureNode[];
  highlights: string[];
  metrics: ProjectMetric[];
  links: ProjectLink[];
  isPrivate: boolean;
  isFeatured?: boolean;
  accentColor: string;
}

export const projects: LabProject[] = [
  {
    id: "bittasker",
    slug: "bittasker",
    title: "BitTasker",
    tagline: "Decentralized Freelance Marketplace",
    description:
      "Built a full-stack decentralized marketplace connecting clients with freelancers without centralized intermediaries — leveraging Rootstock (Bitcoin sidechain) for trustless escrow settlements, Nostr protocol for censorship-resistant communication and data sovereignty, and cryptographic attestation services for verifiable reputation.",
    longDescription:
      "BitTasker is a decentralized two-sided marketplace connecting clients with freelancers without centralized intermediaries, by replacing centralized platform authority with cryptographic proofs and on-chain settlement guarantees.\n\nBuilt across seven interconnected services, the platform eliminates trusted intermediaries throughout the entire task lifecycle — from discovery and bidding through escrow-funded execution, dispute resolution, and reputation building.\n\nAll marketplace data lives on censorship-resistant Nostr relays, ensuring users retain full sovereignty over their communications, contracts, and reviews. Escrow settlements are enforced by smart contracts on Rootstock (Bitcoin sidechain), with gasless on-chain operations removing the need for users to hold cryptocurrency for transaction fees.\n\nAuthentication combines WebAuthn passkeys with Nostr Schnorr challenge-response verification, eliminating password-based attack vectors entirely. A smart routing engine compares quotes across multiple swap providers for optimal cross-chain asset mobility. Reviews and reputation are anchored to on-chain settlement proofs through dual-signature challenge-response flows, creating a portable and censorship-resistant trust graph.\n\nContinuous delivery via GitLab CI automates releases across web, Google Play, and Zapstore.",
    status: "production",
    category: "professional",
    role: "Lead Full-Stack Developer",
    year: "2025 — 2026",
    company: "BitTasker",
    techStack: [
      "SvelteKit",
      "Capacitor",
      "TypeScript",
      "NestJS",
      "Prisma",
      "PostgreSQL",
      "Redis",
      "BullMQ",
      "Nostr Protocol",
      "Rootstock (RSK)",
      "Boltz Swaps",
      "Solidity",
      "WebAuthn Passkeys",
      "Tailwind CSS + DaisyUI",
      "Cloudflare Workers",
      "Cloudflare R2",
      "Cloudflare Durable Objects",
      "MeiliSearch",
      "Firebase Cloud Messaging",
      "Changelly",
      "GitLab CI",
      "Sentry",
      "Vitest",
      "Playwright",
    ],
    architecture: [
      {
        label: "Frontend",
        tech: "SvelteKit + Capacitor",
        role: "Hybrid SSR/CSR SvelteKit application — server-side rendered static pages for SEO-critical company content, with the application shell running as a client-side rendered SPA for all functional routes. Compiled to native Android and iOS via Capacitor bridge with 20+ native plugins (push notifications, biometrics, barcode scanning, geolocation, haptics...). Implements fine-grained reactive state management, route-level code splitting, and PWA support. Deployed to Cloudflare Workers as a static SPA with prerendered shell. Published to Google Play store and Zapstore as production mobile clients.",
      },
      {
        label: "Backend API",
        tech: "NestJS + Prisma + PostgreSQL",
        role: "Type-safe REST API governing authentication (WebAuthn passkeys integrated with Nostr Schnorr challenge-response verification, JWT with refresh token rotation), authorization, and cross-service coordination. Hosts an event-driven reminders engine with 80+ notification types across 9 categories delivered via Firebase Cloud Messaging push notifications and real-time WebSocket gateway. Integrates Changelly for crypto-to-crypto swaps, Google Translate API for dynamic content localization, Cloudflare R2 for media uploads, and BullMQ priority queues for asynchronous job processing. Global rate limiting via Redis-backed throttler.",
      },
      {
        label: "Nostr Relay Infrastructure",
        tech: "Nostr Protocol",
        role: "Nostr relay infrastructure supporting 16 protocol extensions (NIPs) including basic protocol flow, contact lists, encrypted messaging, event deletion, parameterized replaceable events, and delegated signing. Features full-text search indexing via MeiliSearch, Web of Trust reputation guards, NIP-05 identity verification, and PostgreSQL-backed event filtering with generic tag queries. Manages 35+ custom event kinds powering task listings, service proposals, bid negotiations, encrypted contract data, profile metadata, saved searches, and review attestations.",
      },
      {
        label: "Escrow Smart Contracts",
        tech: "Solidity + Cloudflare Worker",
        role: "Trustless escrow system deployed on Rootstock (Bitcoin sidechain) covering all payment paths — escrow funding, milestone-based release, dispute initiation, dispute resolution, refund, and no-show penalties. Integrated with a meta-transaction relay (Cloudflare Worker) enabling gasless on-chain operations with pre-flight simulation. The system also supports account abstraction on Arbitrum for gasless token transfers with paymaster sponsorship.",
      },
      {
        label: "Wallet Core",
        tech: "Published NPM Package (@bittasker/wallet-core)",
        role: "Open-source multi-chain wallet SDK published to NPM, abstracting HD key derivation for RSK, Boltz.exchange atomic swaps (submarine, reverse, and chain swaps) with Taproot MuSig2 cooperative refunds, Lightning invoice decoding, Liquid Network transactions, and gasless claiming via meta-transactions. 465+ tests with 85% coverage thresholds.",
      },
      {
        label: "Reviews Attestation Service",
        tech: "Cloudflare Worker + Durable Objects (@bittasker/reviews-contracts NPM package)",
        role: "Verifiable reputation layer deployed as a Cloudflare Worker with Durable Object-backed state management. Implements a dual-signature challenge-response protocol that cryptographically binds a user's Nostr identity (Schnorr) to their on-chain settlement participation (EVM wallet signature), then reads the on-chain contract state via RPC to verify the settlement reached a reviewable terminal state. Issues signed Nostr attestation events anchored to the settlement, creating a portable, censorship-resistant reputation graph. Published shared schemas and ABIs as @bittasker/reviews-contracts to NPM.",
      },
    ],
    highlights: [
      "Primary developer behind a 7-service decentralized ecosystem — contributing across frontend, backend, smart contract integration, Nostr protocol implementation, and mobile deployment to Google Play and Zapstore",
      "Deployed and configured a Nostr relay infrastructure supporting 16 NIPs and 35+ custom event kinds, with full-text search indexing and Web of Trust reputation guards for task and service discovery",
      "Integrated trustless escrow smart contracts on Rootstock with meta-transaction relay, enabling gasless on-chain operations and multi-path dispute resolution",
      "Published @bittasker/wallet-core to NPM — a multi-chain SDK abstracting HD wallet derivation, Boltz atomic swaps, Lightning invoice processing, and gasless claiming across 465+ tests",
      "Built a cryptographic attestation service using dual-signature challenge-response flows that bind reviewer identity to on-chain settlement proofs, with Durable Object-backed atomic slot claims",
      "Enabled gasless blockchain transactions so users never need to hold cryptocurrency for fees, with automatic failover ensuring high availability",
      "Built a smart routing engine comparing swap quotes across multiple providers for optimal cross-chain asset mobility",
      "Eliminated password-based attack vectors by implementing WebAuthn passkeys integrated with Nostr Schnorr challenge-response verification",
      "Shipped cross-platform native mobile applications to Google Play and Zapstore via Capacitor, with GitLab CI pipelines automating releases across web and mobile targets",
      "Implemented an event-driven reminders engine with 80+ notification types, priority queues, and contextual re-engagement campaigns",
    ],
    metrics: [
      { label: "Services", value: "7", icon: "layers" },
      { label: "Target Platforms", value: "3", icon: "globe" },
      { label: "NPM Packages", value: "3", icon: "package" },
      { label: "App Store Listings", value: "2", icon: "smartphone" },
      { label: "Nostr Event Kinds", value: "35+", icon: "hash" },
      { label: "Notification Types", value: "80+", icon: "bell" },
    ],
    links: [
      { label: "Live App", url: "https://bittasker.com", type: "live" },
      {
        label: "Google Play",
        url: "https://play.google.com/store/apps/details?id=com.bittasker.app",
        type: "download",
      },
    ],
    isPrivate: false,
    isFeatured: true,
    accentColor: "#f7931a",
  },
  {
    id: "yoodoogood",
    slug: "yoodoogood",
    title: "YooDooGood",
    tagline: "Gamified Rewards & Prize Bidding Platform",
    description:
      "A gamified rewards platform where users earn an in-app currency through 13+ casual games, offerwalls, surveys, and partner purchases — then bid on real-world prizes in a marketplace-style auction system powered by Stripe subscriptions.",
    longDescription:
      "YooDooGood is a gamified rewards ecosystem where users accumulate an in-app currency called goodies through multiple earning channels, then spend them bidding on physical prizes in a marketplace-style auction.\n\nThe platform offers 13+ casual games spanning puzzle, arcade, trivia, and card genres — each built with SvelteKit and native JavaScript, with select titles using Canvas APIs and the Phaser game engine.\n\nBeyond games, users earn goodies through watching ads, completing third-party offerwalls and surveys, purchasing from partner retailers (e.g. AliExpress cashback), and a daily spin wheel. Goodies are spent in the prizes section — a marketplace where users bid on real items, with winners selected through randomized weighted selection and prizes shipped by the company.\n\nThe platform also features a Good Cause section for voluntary community work, manual annual subscriptions via Stripe, gift card redemption, and a full backoffice dashboard for monitoring users, transactions, and platform data.",
    status: "production",
    category: "professional",
    role: "Frontend Developer",
    year: "2023 — 2025",
    company: "KJR TeleCom",
    techStack: [
      "SvelteKit",
      "TypeScript",
      "Tailwind CSS",
      "DaisyUI",
      "Phaser",
      "Canvas API",
      "Stripe",
      "i18n",
    ],
    architecture: [
      {
        label: "Frontend",
        tech: "SvelteKit",
        role: "Full SvelteKit application handling SSR for landing and marketing pages, with client-side rendering for all game and interactive routes. Implements i18n internationalization, responsive layouts, and route-level code splitting.",
      },
      {
        label: "Casual Games Layer",
        tech: "SvelteKit + Canvas API + Phaser",
        role: "13+ browser-based games — most built with SvelteKit and vanilla JavaScript, with Good Booboole using Canvas APIs for physics-based ball merging and Dino Colors built on the Phaser game engine for drag-and-drop tile mechanics. Each game implements unique scoring, win/loss conditions, and goodies reward calculations.",
      },
      {
        label: "Rewards Engine",
        tech: "SvelteKit + Third-party APIs",
        role: "Multi-channel goodies earning system aggregating game rewards, offerwall completions, survey payouts, partner purchase cashback, ad view rewards, and a daily spin wheel with randomized payouts.",
      },
      {
        label: "Prize Bidding System",
        tech: "SvelteKit",
        role: "Marketplace-style auction where users bid goodies on physical prizes. Winners selected through randomized weighted selection based on bid amounts. Company handles prize fulfillment and shipping.",
      },
      {
        label: "Subscriptions & Payments",
        tech: "Stripe",
        role: "Manual annual subscription management via Stripe. Gift card redemption system for converting goodies to partner gift cards.",
      },
      {
        label: "Backoffice Dashboard",
        tech: "SvelteKit",
        role: "Internal administration panel for monitoring users, transactions, game performance, offerwall integrations, prize inventory, and platform-wide analytics.",
      },
    ],
    highlights: [
      "Built 13+ casual games with diverse mechanics — arithmetic puzzles, minimax AI opponents, Phaser-based tile matching, Canvas physics engines, trivia, reaction-time tests, and classic card games",
      "Implemented a minimax algorithm for Connect 4 bot difficulty, providing adaptive AI opponents that scale with player skill",
      "Integrated Phaser game engine for Dino Colors — a Tetris-style drag-and-drop color-matching game with real-time collision detection",
      "Integrated a Canvas-based physics merge game (Good Booboole) with ball tiers, size-based collision, and progressive merging mechanics",
      "Developed a multi-channel rewards engine aggregating earnings from games, offerwalls, surveys, partner cashback, ad views, and daily spins",
      "Created a prize bidding marketplace with randomized weighted selection, where users compete for physical prizes using earned in-app currency",
      "Integrated Stripe for annual subscription management and built a gift card redemption pipeline",
      "Built a full backoffice dashboard for monitoring users, transactions, game analytics, and platform operations",
    ],
    metrics: [
      { label: "Casual Games", value: "13+", icon: "gamepad-2" },
      { label: "Earning Channels", value: "6+", icon: "coins" },
      { label: "Game Engines", value: "3", icon: "cpu" },
      { label: "i18n Support", value: "Yes", icon: "globe" },
    ],
    links: [],
    isPrivate: true,
    accentColor: "#14b8a6",
  },
  {
    id: "immense",
    slug: "immense",
    title: "Immense",
    tagline: "Construction Workforce Management Dashboard",
    description:
      "A role-based workforce management dashboard for the construction industry — tracking workers, managing tools and certifications, and delivering in-dashboard training programs with progress tracking.",
    longDescription:
      "Immense tackles a real problem in construction: keeping track of who's qualified for what, which tools are where, and whether training is up to date — all across a workforce that's constantly moving between job sites.\n\nManagers use the dashboard to create training programs that workers complete directly in the platform, much like passing a certification. If a worker fails, they can retake the training. Progress is tracked in real time and visible to both the worker and their manager, so there's never ambiguity about who's qualified.\n\nEvery user sees the dashboard through the lens of their role — workers see their own assignments, training status, and tool checkouts, while managers get the full picture across their team. The dashboard includes drag-and-drop interactions for resource assignment, PDF generation for reports and certifications, advanced data tables for filtering and sorting large inventories, image cropping for profile and document management, and charts visualizations for workforce analytics.\n\nThe entire application is internationalized for multi-language deployment.",
    status: "production",
    category: "professional",
    role: "Freelance Frontend Developer",
    year: "2023",
    company: "Immense",
    techStack: [
      "Next.js",
      "Redux",
      "TypeScript",
      "Tailwind CSS",
      "Chart.js",
      "JWT",
      "ACL",
      "i18n",
      "DnD Library",
      "PDF Library",
      "Data Table Library",
      "Image Cropping Library",
    ],
    architecture: [
      {
        label: "Frontend Application",
        tech: "Next.js + Redux + TypeScript",
        role: "Multi-view dashboard with Redux shared state management. Route-based code splitting with role-aware navigation rendering.",
      },
      {
        label: "Training System",
        tech: "Next.js",
        role: "In-dashboard training and certification flow — managers create programs, workers complete them interactively, retake on failure, with progress tracking visible to all authorized roles.",
      },
      {
        label: "Data & Visualization",
        tech: "Chart.js + Data Tables + PDF",
        role: "Analytics dashboards, sortable/filterable data tables for worker and tool inventories, and PDF generation for reports and certifications.",
      },
    ],
    highlights: [
      "Built a role-based construction workforce dashboard with in-dashboard training and certification",
      "Workers complete training programs interactively, retake on failure, with real-time progress tracking for managers",
      "Integrated drag-and-drop, PDF generation, advanced data tables, image cropping, and Chart.js analytics into a cohesive experience",
      "Added i18n for multi-language deployment across the entire application",
    ],
    metrics: [
      { label: "Domain", value: "Construction", icon: "hard-hat" },
      { label: "Key Feature", value: "In-app Training", icon: "graduation-cap" },
      { label: "State Management", value: "Redux", icon: "database" },
      { label: "Engagement", value: "Freelance", icon: "briefcase" },
    ],
    links: [],
    isPrivate: true,
    accentColor: "#0ea5e9",
  },
  {
    id: "bms",
    slug: "bms",
    title: "MVault — BMS",
    tagline: "SaaS Platform with Microservices Architecture",
    description:
      "Frontend developer on a multi-tenant SaaS platform built on a scalable microservices backend. Shipped three production applications — a merchant dashboard, a spa booking app, and a mobile-ready backoffice.",
    longDescription:
      "I helped building a multi-tenant SaaS platform designed to scale — a backend of independent microservices communicating through event emitters, each responsible for its own domain (appointments, payments, delivery, subscriptions, and more), with the architecture intentionally designed to add new services as the platform grew.\n\nI joined as a frontend developer and shipped three applications on top of this foundation.\n\nMVault is the main product — a merchant dashboard where businesses run their entire operation like a command center for: company setup, user management, order processing, invoicing, subscriptions, everything wired together through GraphQL queries to the backend services.\n\nA spa booking app for customers to browse services, pick their preferred staff member, and book a time slot — this project largely directly shaped the booking microservice design and architecture.\n\nThe backoffice rounded out the trio — an admin panel with two permission tiers (full-access super-users and scoped managers), also packaged as a mobile app via Capacitor for the client to manage operations on the go.\n\nAll three apps share a consistent auth layer with token refresh, role-based access control, and i18n for multi-language support.",
    status: "production",
    category: "professional",
    role: "Full-Stack Developer",
    year: "2022 — 2023",
    company: "Big M Solutions",
    techStack: [
      "Nuxt.js",
      "Pinia",
      "TypeScript",
      "Tailwind CSS",
      "GraphQL",
      "Capacitor",
      "Node.js",
      "ArangoDB",
      "Stripe",
      "JWT",
      "ACL",
      "i18n",
      "Microservices",
      "Event Emitters",
    ],
    architecture: [
      {
        label: "Backend Microservices",
        tech: "Node.js + ArangoDB + GraphQL",
        role: "Scalable architecture of independent services communicating via event emitters. Designed to grow — new services are added as the platform expands. ArangoDB for non-relational storage, Stripe for payments, GraphQL for frontend queries.",
      },
      {
        label: "MVault",
        tech: "Nuxt.js + Pinia + TypeScript + GraphQL",
        role: "Flagship merchant dashboard — company creation, user administration, order processing, invoice tracking, subscription management. The primary interface for all backend services.",
      },
      {
        label: "Spa Booking App",
        tech: "Nuxt.js + Pinia + TypeScript + GraphQL",
        role: "Client-facing booking application where customers browse services, select staff, and make reservations. This project drove the design and implementation of the booking microservice.",
      },
      {
        label: "Backoffice + Mobile",
        tech: "Nuxt.js + Capacitor + GraphQL",
        role: "Administration panel with two permission tiers — full-access super-users and scoped managers. Packaged as a mobile app via Capacitor for on-the-go management.",
      },
    ],
    highlights: [
      "Shipped three production frontend applications on top of a scalable microservices backend",
      "Built MVault — a merchant dashboard where businesses manage their entire operation from a single interface",
      "Drove the design of the booking microservice by building the client-facing spa app that defined its requirements",
      "Packaged the backoffice as a mobile app via Capacitor, extending admin capabilities to mobile devices",
      "Implemented consistent auth, role-based access control, and i18n across all three applications",
    ],
    metrics: [
      { label: "Architecture", value: "Microservices", icon: "boxes" },
      { label: "Web Applications", value: "3", icon: "layout" },
      { label: "Auth Model", value: "JWT + ACL", icon: "shield" },
      { label: "Duration", value: "7 months", icon: "calendar" },
    ],
    links: [],
    isPrivate: true,
    accentColor: "#6366f1",
  },
  {
    id: "kinshi",
    slug: "kinshi",
    title: "Kinshi",
    tagline: "Classifieds Marketplace Platform",
    description:
      "My entry into professional web development — a full-featured classifieds marketplace with a web app, backoffice with automated data ingestion, and contributions to the backend API gateway.",
    longDescription:
      "Kinshi was where I cut my teeth as a professional engineer. It's a classifieds marketplace, where users buy and sell items across different categories, with subscription-based boosts for listings and search enhancements.\n\nI worked across three projects in the ecosystem. The main web app is where users browse, list, and purchase items, with category navigation, search, and i18n support. The backoffice handles everything behind the scenes — user management, categories and subcategories administration, listing moderation, announcements, order tracking, and boosted item management. One of the more interesting features I built was an automated data ingestion system that pulled listings from external sources into the platform, significantly expanding the catalog available to users.\n\nI also contributed to the backend API gateway, adding new features and gaining hands-on experience with how APIs are structured, how data flows between frontend and backend, and how shared state patterns work in production applications. The web app and backoffice both use Redux for state management, with i18n across the board.\n\nI also built the company's agency website — a static site for presenting the company to prospective clients.",
    status: "production",
    category: "professional",
    role: "Junior Software Engineer",
    year: "2022",
    company: "Pixon Digital",
    techStack: [
      "Next.js",
      "Redux",
      "TypeScript",
      "Node.js",
      "Sequelize",
      "MySQL",
      "HTML",
      "SCSS",
      "i18n",
    ],
    architecture: [
      {
        label: "Marketplace Web App",
        tech: "Next.js + Redux",
        role: "Classifieds marketplace — category browsing, item listing and search, subscription-based listing boosts, and i18n. Redux for shared state across complex listing and search views.",
      },
      {
        label: "Backoffice Dashboard",
        tech: "Next.js + Redux",
        role: "Administrative panel for managing users, categories, subcategories, listings, announcements, boosted items, and orders. Includes automated data ingestion from external sources.",
      },
      {
        label: "API Gateway",
        tech: "Node.js + Sequelize + MySQL",
        role: "Backend API gateway handling authentication, listing CRUD, category management, subscription logic, and order processing.",
      },
      {
        label: "Agency Website",
        tech: "HTML + SCSS",
        role: "Static company website presented to prospective clients.",
      },
    ],
    highlights: [
      "First professional project — built the marketplace web app, backoffice, and contributed to the backend API gateway",
      "Developed the marketplace with category navigation, listing search, subscription-based boosts, and i18n",
      "Built the backoffice with user management, listing moderation, order tracking, and automated data ingestion from external sources",
      "Contributed features to the Node.js API gateway, learning API architecture and production data flows firsthand",
      "Added i18n internationalization across both the web app and backoffice",
    ],
    metrics: [
      { label: "Projects", value: "3", icon: "layers" },
      { label: "Marketplace", value: "Classifieds", icon: "tag" },
      { label: "Backend", value: "Node.js + MySQL", icon: "server" },
      { label: "i18n", value: "Yes", icon: "globe" },
    ],
    links: [],
    isPrivate: true,
    accentColor: "#ec4899",
  },
  {
    id: "wallet-core",
    slug: "wallet-core",
    title: "Wallet Core",
    tagline: "Multi-Chain Bitcoin Wallet SDK",
    description:
      "Open-source multi-chain wallet SDK published to NPM as @bittasker/wallet-core — abstracting HD key derivation, Boltz atomic swaps (submarine, reverse, chain), Lightning invoice processing, Liquid Network transactions, and gasless claiming via meta-transactions. 465+ tests with 85% coverage thresholds.",
    longDescription:
      "Extracted from the BitTasker ecosystem and published as @bittasker/wallet-core to NPM. This SDK provides a unified interface for multi-chain Bitcoin wallet operations — HD key derivation for RSK, Boltz.exchange atomic swaps (submarine, reverse, and chain swaps) with Taproot MuSig2 cooperative refunds, Lightning invoice decoding, Liquid Network transactions, and gasless claiming via meta-transactions.\n\nDesigned as a production-grade library with 465+ tests and 85% coverage thresholds, used in production by the BitTasker platform across web and mobile clients.",
    status: "open-source",
    category: "open-source",
    role: "Author & Maintainer",
    year: "2025",
    techStack: [
      "TypeScript",
      "Bitcoin",
      "Lightning Network",
      "Rootstock",
      "Liquid Network",
      "Boltz.exchange",
      "Taproot MuSig2",
      "NPM",
    ],
    architecture: [
      {
        label: "HD Wallet Derivation",
        tech: "TypeScript",
        role: "BIP32/BIP44 hierarchical deterministic key derivation for RSK and other Bitcoin-based chains.",
      },
      {
        label: "Atomic Swaps",
        tech: "Boltz.exchange",
        role: "Submarine, reverse, and chain swaps via Boltz.exchange with Taproot MuSig2 cooperative refund support.",
      },
      {
        label: "Lightning & Liquid",
        tech: "TypeScript",
        role: "Lightning invoice decoding and payment request handling. Liquid Network transaction construction and signing.",
      },
      {
        label: "Gasless Claiming",
        tech: "Meta-transactions",
        role: "Meta-transaction relay integration enabling gasless claiming operations — users never need to hold native tokens for fees.",
      },
    ],
    highlights: [
      "Published @bittasker/wallet-core to NPM — a production-grade multi-chain wallet SDK",
      "465+ tests with 85% coverage thresholds ensuring reliability across wallet operations",
      "Supports Boltz atomic swaps with Taproot MuSig2 cooperative refunds",
      "Used in production by the BitTasker platform across web and mobile clients",
    ],
    metrics: [
      { label: "Registry", value: "Wallet Core", icon: "package" },
      { label: "Tests", value: "465+", icon: "check-circle" },
      { label: "Coverage", value: "85%", icon: "shield" },
      { label: "Chains", value: "4+", icon: "link" },
    ],
    links: [
      {
        label: "NPM",
        url: "https://www.npmjs.com/package/@bittasker/wallet-core",
        type: "npm",
      },
    ],
    isPrivate: false,
    accentColor: "#cb3837",
  },
  {
    id: "reviews-contracts",
    slug: "reviews-contracts",
    title: "Reviews Attestations",
    tagline: "Verifiable Reputation Attestation Library",
    description:
      "Published NPM package (@bittasker/reviews-contracts) containing shared schemas and ABIs for the BitTasker review attestation system — enabling verifiable, censorship-resistant reputation anchored to on-chain settlement proofs.",
    longDescription:
      "The attestation layer behind BitTasker's reputation system, extracted and published as @bittasker/reviews-contracts to NPM. Contains the shared schemas, ABIs, and type definitions needed to verify and issue review attestations — cryptographic proofs that bind a reviewer's Nostr identity to their on-chain settlement participation.\n\nUsed by the Reviews Attestation Service (a Cloudflare Worker with Durable Objects) to validate settlement states and issue signed Nostr events that form a portable, censorship-resistant reputation graph.",
    status: "open-source",
    category: "open-source",
    role: "Author & Maintainer",
    year: "2026",
    techStack: [
      "TypeScript",
      "Solidity",
      "Nostr Protocol",
      "Cloudflare Workers",
      "Durable Objects",
      "NPM",
    ],
    architecture: [
      {
        label: "Shared Schemas",
        tech: "TypeScript",
        role: "Type definitions and validation schemas for review attestation events, settlement states, and signature verification.",
      },
      {
        label: "Contract ABIs",
        tech: "Solidity",
        role: "ABI definitions for reading on-chain escrow contract states to verify settlements reached reviewable terminal states.",
      },
    ],
    highlights: [
      "Published @bittasker/reviews-contracts to NPM — shared schemas and ABIs for verifiable reputation attestations",
      "Enables cryptographic binding of reviewer identity to on-chain settlement proofs",
      "Used in production by the BitTasker Reviews Attestation Service",
    ],
    metrics: [
      { label: "Registry", value: "Reviews", icon: "package" },
      { label: "Purpose", value: "Attestation", icon: "shield-check" },
      { label: "Protocol", value: "Nostr", icon: "radio" },
    ],
    links: [
      {
        label: "NPM",
        url: "https://www.npmjs.com/package/@bittasker/reviews-contracts",
        type: "npm",
      },
    ],
    isPrivate: false,
    accentColor: "#8b5cf6",
  },
  {
    id: "nexus",
    slug: "nexus",
    title: "Nexus",
    tagline: "API Gateway & Microservices Foundation",
    description:
      "Architected an API gateway and foundational microservices for a broader SaaS platform, establishing the backend structure for independently deployable services with RabbitMQ inter-service communication.",
    longDescription:
      "Nexus is the foundational backend architecture for a SaaS platform — an API gateway paired with independently deployable microservices. Built with Deno and Drizzle ORM on PostgreSQL, the system uses RabbitMQ for asynchronous inter-service communication, enabling distributed services to exchange messages without tight coupling. Docker containerizes the entire development environment for consistent local development and deployment.",
    status: "experimental",
    category: "experiment",
    role: "Backend Developer",
    year: "2025",
    techStack: ["Deno", "RabbitMQ", "PostgreSQL", "Drizzle ORM", "Docker"],
    architecture: [
      {
        label: "API Gateway",
        tech: "Deno",
        role: "Central entry point routing requests to downstream microservices with shared middleware for auth, logging, and error handling.",
      },
      {
        label: "Message Broker",
        tech: "RabbitMQ",
        role: "Asynchronous inter-service communication enabling decoupled, distributed services to exchange events and commands.",
      },
      {
        label: "Database Layer",
        tech: "PostgreSQL + Drizzle ORM",
        role: "Type-safe database access with Drizzle ORM providing schema definitions and query building against PostgreSQL.",
      },
      {
        label: "Containerization",
        tech: "Docker",
        role: "Docker Compose orchestration for the full service stack, enabling consistent local development and deployment.",
      },
    ],
    highlights: [
      "Architected an API gateway and foundational microservices for a SaaS platform",
      "Implemented inter-service communication using RabbitMQ for asynchronous messaging",
      "Built with Deno, Drizzle ORM, and PostgreSQL with Docker containerization",
    ],
    metrics: [
      { label: "Architecture", value: "Microservices", icon: "boxes" },
      { label: "Message Broker", value: "RabbitMQ", icon: "radio" },
      { label: "Runtime", value: "Deno", icon: "cpu" },
    ],
    links: [],
    isPrivate: true,
    accentColor: "#8b5cf6",
  },
  {
    id: "pms",
    slug: "pms",
    title: "Project Management System",
    tagline: "Client & Project Management Platform",
    description:
      "Built a full-stack project management application for organizing clients and their projects through a centralized web interface with CRUD workflows.",
    longDescription:
      "A full-stack project management application designed to help teams organize clients and their associated projects through a single, centralized interface. The React frontend communicates with a Node.js/Express backend, implementing complete create, read, update, and delete workflows for both client and project records. MongoDB handles persistent data storage, with the backend exposing RESTful endpoints that the frontend consumes for real-time data management.",
    status: "experimental",
    category: "experiment",
    role: "Full-Stack Developer",
    year: "2024",
    techStack: ["React", "Node.js", "Express.js", "MongoDB", "JavaScript"],
    architecture: [
      {
        label: "Frontend",
        tech: "React",
        role: "Single-page application with component-based UI for managing clients and projects, handling form state and API communication.",
      },
      {
        label: "Backend API",
        tech: "Node.js + Express",
        role: "RESTful API server handling CRUD operations for clients and projects with structured route handlers.",
      },
      {
        label: "Database",
        tech: "MongoDB",
        role: "Document-based persistent storage for client and project records with flexible schema design.",
      },
    ],
    highlights: [
      "Built a full-stack project management application with React frontend and Node.js/Express backend",
      "Implemented end-to-end CRUD workflows for client and project records",
      "Integrated MongoDB for persistent data management",
    ],
    metrics: [
      { label: "Stack", value: "MERN", icon: "layers" },
      { label: "Features", value: "CRUD", icon: "edit" },
      { label: "Database", value: "MongoDB", icon: "database" },
    ],
    links: [],
    isPrivate: true,
    accentColor: "#10b981",
  },
  {
    id: "auth-system",
    slug: "auth-system",
    title: "Authentication System",
    tagline: "JWT Auth with Refresh Token Support",
    description:
      "Built a full-stack authentication system with JWT-based authentication and refresh-token support, implementing token-based session renewal across React and Node.js.",
    longDescription:
      "A full-stack authentication system implementing JWT-based authentication with refresh-token support. The React frontend handles login and registration flows, while the Node.js/Express backend manages token issuance, verification, and renewal. Sequelize ORM manages persistent user data in a SQL database, and the refresh-token mechanism maintains authenticated sessions without requiring repeated sign-ins — tokens are silently renewed before expiration.",
    status: "experimental",
    category: "experiment",
    role: "Full-Stack Developer",
    year: "2024",
    techStack: ["React", "Node.js", "Express.js", "JWT", "Sequelize", "JavaScript"],
    architecture: [
      {
        label: "Frontend",
        tech: "React",
        role: "Login and registration UI with token storage, automatic refresh handling, and protected route rendering.",
      },
      {
        label: "Backend API",
        tech: "Node.js + Express",
        role: "Authentication endpoints for login, registration, token verification, and refresh-token renewal.",
      },
      {
        label: "Database",
        tech: "Sequelize",
        role: "ORM-managed user data persistence with model definitions for users and refresh tokens.",
      },
    ],
    highlights: [
      "Built a full-stack authentication system with JWT-based authentication and refresh-token support",
      "Designed the authentication flow across React frontend and Node.js/Express backend",
      "Implemented token-based session renewal for seamless authenticated sessions",
    ],
    metrics: [
      { label: "Auth Method", value: "JWT", icon: "shield" },
      { label: "Stack", value: "Full-Stack", icon: "layers" },
      { label: "ORM", value: "Sequelize", icon: "database" },
    ],
    links: [],
    isPrivate: true,
    accentColor: "#f59e0b",
  },
];

export const getFeaturedProject = (): LabProject | undefined =>
  projects.find((p) => p.isFeatured);

export const getProfessionalProjects = (): LabProject[] =>
  projects.filter((p) => p.category === "professional" && !p.isFeatured);

export const getOpenSourceProjects = (): LabProject[] =>
  projects.filter((p) => p.category === "open-source");

export const getExperimentProjects = (): LabProject[] =>
  projects.filter((p) => p.category === "experiment");
