import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Labs",
  description:
    "Explore projects by Mohamed Ait Ouahmane — decentralized marketplaces, Bitcoin wallet SDKs, SaaS platforms, open-source libraries, and engineering experiments.",
  openGraph: {
    title: "Labs | Mohamed Ait Ouahmane",
    description:
      "Explore projects by Mohamed Ait Ouahmane — decentralized marketplaces, Bitcoin wallet SDKs, SaaS platforms, open-source libraries, and engineering experiments.",
  },
};

export default function LabsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
