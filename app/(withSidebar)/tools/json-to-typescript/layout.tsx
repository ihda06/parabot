import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON to TypeScript Converter | ParaBot",
  description:
    "Free online tool to convert JSON objects to TypeScript interfaces and types. Generate type definitions from API responses, configuration files, or any JSON data instantly.",
  keywords: [
    "json to typescript",
    "json converter",
    "typescript generator",
    "json type definition",
    "typescript interface generator",
    "json parser",
    "type generator",
    "developer tools",
    "code generator",
    "api type generator",
  ],
  openGraph: {
    title: "JSON to TypeScript Converter | ParaBot",
    description:
      "Free online tool to convert JSON objects to TypeScript interfaces and types. Generate type definitions from JSON data instantly.",
    type: "website",
    url: "https://parabot.vercel.app/tools/json-to-typescript",
  },
  twitter: {
    card: "summary_large_image",
    title: "JSON to TypeScript Converter | ParaBot",
    description:
      "Free online tool to convert JSON objects to TypeScript interfaces and types. Generate type definitions from JSON data instantly.",
  },
  alternates: {
    canonical: "https://parabot.vercel.app/tools/json-to-typescript",
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
  authors: [{ name: "Ihda Anwari", url: "https://ihda-anwari.vercel.app/" }],
  creator: "Ihda Anwari",
};

export default function JsonToTypeScriptLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

