import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import ResumeHeader from "@/lib/components/ResumeHeader";
import content from "@/lib/data/resume.md";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Professional resume of Mohamed Ait Ouahmane — Decentralized Systems Engineer with experience building Bitcoin-native DApps, DeFi protocols, and full-stack applications.",
  openGraph: {
    title: "Resume | Mohamed Ait Ouahmane",
    description:
      "Professional resume of Mohamed Ait Ouahmane — Decentralized Systems Engineer with experience building Bitcoin-native DApps, DeFi protocols, and full-stack applications.",
  },
};

export default function ResumePage() {
  return (
    <div className="min-h-screen">
      <ResumeHeader />
      <main className="print-page max-w-3xl mx-auto relative z-10 px-4 sm:px-6 py-8 sm:py-12">
        <article className="resume-content">
          <ReactMarkdown>{content}</ReactMarkdown>
        </article>
      </main>
    </div>
  );
}
