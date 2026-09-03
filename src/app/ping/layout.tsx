import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Mohamed Ait Ouahmane — decentralized systems engineer available for collaborations, consulting, and engineering projects.",
  openGraph: {
    title: "Contact | Mohamed Ait Ouahmane",
    description:
      "Get in touch with Mohamed Ait Ouahmane — decentralized systems engineer available for collaborations, consulting, and engineering projects.",
  },
};

export default function PingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
