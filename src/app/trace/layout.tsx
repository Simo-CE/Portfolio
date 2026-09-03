import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trace",
  description:
    "Career timeline and engineering journey of Mohamed Ait Ouahmane — from junior developer to lead full-stack engineer building decentralized systems on Bitcoin.",
  openGraph: {
    title: "Trace | Mohamed Ait Ouahmane",
    description:
      "Career timeline and engineering journey of Mohamed Ait Ouahmane — from junior developer to lead full-stack engineer building decentralized systems on Bitcoin.",
  },
};

export default function TraceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
