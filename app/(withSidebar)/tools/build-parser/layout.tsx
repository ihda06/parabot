import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next.js Build Parser & Analyzer | ParaBot",
  description:
    "Free online tool to parse and analyze Next.js build output. Understand route sizes, bundle distribution, first load JS, and get optimization recommendations for your Next.js application.",
  keywords: [
    "next.js",
    "build parser",
    "bundle analyzer",
    "route analysis",
    "performance optimization",
    "next.js build output",
    "bundle size",
    "first load js",
    "developer tools",
    "web performance",
  ],
  openGraph: {
    title: "Next.js Build Parser & Analyzer | ParaBot",
    description:
      "Free online tool to parse and analyze Next.js build output. Understand route sizes, bundle distribution, and get optimization recommendations.",
    type: "website",
    url: "https://parabot.dev/tools/build-parser",
  },
  twitter: {
    card: "summary_large_image",
    title: "Next.js Build Parser & Analyzer | ParaBot",
    description:
      "Free online tool to parse and analyze Next.js build output. Understand route sizes, bundle distribution, and get optimization recommendations.",
  },
  alternates: {
    canonical: "https://parabot.dev/tools/build-parser",
  },
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
  authors: [
    { name: "Ihda Anwari", url: "https://ihda-anwari.vercel.app/" },
  ],
  creator: "Ihda Anwari",
};

export default function BuildParserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
