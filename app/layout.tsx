import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://parabot.vercel.app"),
  title: {
    default: "ParaBot - Free Online Developer Tools",
    template: "%s | ParaBot",
  },
  description:
    "Free online developer tools collection. Analyze, parse, format, and optimize your code All tools run in your browser - no data sent to servers.",
  keywords: [
    "developer tools",
    "online tools",
    "code tools",
    "build parser",
    "bundle analyzer",
    "performance tools",
    "web development",
    "developer utilities",
    "free tools",
    "code analysis",
    "build optimization",
    "code formatter",
  ],
  authors: [
    { name: "Ihda Anwari", url: "https://ihda-anwari.vercel.app/" },
    { name: "ParaBot" },
  ],
  creator: "Ihda Anwari",
  publisher: "ParaBot",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://parabot.vercel.app",
    siteName: "ParaBot",
    title: "ParaBot - Free Online Developer Tools",
    description:
      "Free online developer tools collection. Analyze, parse, format, and optimize your code",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ParaBot - Developer Tools Collection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ParaBot - Free Online Developer Tools",
    description:
      "Free online developer tools collection. Analyze, parse, format, and optimize your code",
    creator: "@parabot",
    images: ["/og-image.png"],
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
  alternates: {
    canonical: "https://parabot.vercel.app",
  },
  category: "developer tools",
  other: {
    "theme-color": "#0a0a0a",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ParaBot",
    description:
      "Free online developer tools collection. Analyze, parse, format, and optimize your code",
    url: "https://parabot.vercel.app",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://parabot.vercel.app/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} ${inter.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
