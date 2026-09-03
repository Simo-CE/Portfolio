"use client";

import CustomCursor from "./CustomCursor";
import DotGrid from "./DotGrid";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DotGrid />
      <CustomCursor />
      <div className="h-[100dvh] container mx-auto py-8 flex flex-col relative z-10">
        {children}
      </div>
    </>
  );
}
