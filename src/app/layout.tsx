import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/lib/components/ClientLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://dooma.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Mohamed Ait Ouahmane — Decentralized Systems Engineer",
    template: "%s | Mohamed Ait Ouahmane",
  },
  description:
    "Portfolio of Mohamed Ait Ouahmane, a decentralized systems engineer specializing in Bitcoin-native DApps, DeFi protocols, Nostr, and full-stack development. Explore projects, open-source work, and engineering case studies.",
  keywords: [
    "Mohamed Ait Ouahmane",
    "decentralized systems engineer",
    "full-stack developer",
    "Bitcoin developer",
    "DApps",
    "DeFi",
    "Nostr protocol",
    "Solidity",
    "Rootstock",
    "Lightning Network",
    "SvelteKit",
    "NestJS",
    "Next.js",
    "web3",
    "blockchain developer",
    "open-source",
    "portfolio",
  ],
  authors: [{ name: "Mohamed Ait Ouahmane", url: siteUrl }],
  creator: "Mohamed Ait Ouahmane",
  publisher: "Mohamed Ait Ouahmane",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Mohamed Ait Ouahmane — Portfolio",
    title: "Mohamed Ait Ouahmane — Decentralized Systems Engineer",
    description:
      "Portfolio of Mohamed Ait Ouahmane, a decentralized systems engineer specializing in Bitcoin-native DApps, DeFi protocols, Nostr, and full-stack development.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohamed Ait Ouahmane — Decentralized Systems Engineer",
    description:
      "Portfolio of Mohamed Ait Ouahmane — decentralized systems engineer specializing in Bitcoin-native DApps, DeFi, and Nostr.",
    creator: "@Mohamed31005002",
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Mohamed Ait Ouahmane",
    url: siteUrl,
    jobTitle: "Decentralized Systems Engineer",
    description:
      "Decentralized systems engineer specializing in Bitcoin-native DApps, DeFi protocols, Nostr, and full-stack development.",
    sameAs: [
      "https://github.com/Simo-CE",
      "https://www.linkedin.com/in/mohamed-ait-ouahmane/",
      "https://x.com/Mohamed31005002",
      "https://www.npmjs.com/~bittasker",
    ],
    knowsAbout: [
      "Bitcoin",
      "Decentralized Applications",
      "DeFi",
      "Nostr Protocol",
      "Solidity",
      "Rootstock",
      "Lightning Network",
      "SvelteKit",
      "NestJS",
      "Next.js",
      "TypeScript",
      "Full-Stack Development",
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
