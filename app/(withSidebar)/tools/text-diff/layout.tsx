import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Text Diff Tool",
  description:
    "Free online tool to compare and visualize differences between two text inputs. See line-by-line changes with color-coded additions and deletions. Perfect for comparing code, documents, or any text content.",
  keywords: [
    "text diff",
    "text comparison",
    "diff tool",
    "text difference",
    "code comparison",
    "text diff viewer",
    "line by line diff",
    "developer tools",
    "text analyzer",
    "compare text",
  ],
  openGraph: {
    title: "Text Diff Tool",
    description:
      "Free online tool to compare and visualize differences between two text inputs. See line-by-line changes with color-coded additions and deletions.",
    type: "website",
    url: "https://parabot.vercel.app/tools/text-diff",
  },
  twitter: {
    card: "summary_large_image",
    title: "Text Diff Tool",
    description:
      "Free online tool to compare and visualize differences between two text inputs. See line-by-line changes with color-coded additions and deletions.",
  },
  alternates: {
    canonical: "https://parabot.vercel.app/tools/text-diff",
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

export default function TextDiffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
