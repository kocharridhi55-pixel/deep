import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useState } from "react";

// The portfolio reads browser storage (theme, session) on first render, so it renders after hydration.
const PortfolioApp = lazy(() => import("@/portfolio/App"));

const TITLE = "RYTHM KOCHAR | Web Developer | Digital Projects";
const DESC =
  "Developer and Data Science Student with knowledge of modern web development, data analysis, and artificial intelligence. Portfolio of Rythm Kochar.";

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
