import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useState } from "react";

// The portfolio reads browser storage (theme, session) on first render, so it renders after hydration.
const PortfolioApp = lazy(() => import("@/portfolio/App"));

const TITLE = "Cinematic Luxury Portfolio | Developer & Data Science Student";
const DESC =
  "A minimal, mysterious, cinematic and luxury editorial portfolio website for a Developer and Data Science Student, featuring slow-motion animations, projects showcase, interactive resume, and contact flow.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="min-h-screen bg-[#09090b]" />;
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#09090b]" />}>
      <PortfolioApp />
    </Suspense>
  );
}
