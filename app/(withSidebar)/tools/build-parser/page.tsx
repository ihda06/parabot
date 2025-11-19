"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  FileCode,
  Sparkles,
  TrendingUp,
  Package,
  List,
  Lightbulb,
  Zap,
  BarChart3,
} from "lucide-react";

import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getTopByFirstLoad,
  getTopByPageSize,
  generateRecommendations,
  getDashboardMetrics,
  parseNextBuildTable,
  rowsToMarkdownTable,
} from "@/lib/build-parser";
import {
  TableSkeleton,
  DashboardSkeleton,
  AnalysisSkeleton,
} from "@/components/build-parser/tab-skeletons";

// Dynamically import tab components for code splitting
const AllRoutesTab = dynamic(
  () =>
    import("@/components/build-parser/all-routes-tab").then((mod) => ({
      default: mod.AllRoutesTab,
    })),
  {
    loading: () => <TableSkeleton />,
  }
);

const FirstLoadTab = dynamic(
  () =>
    import("@/components/build-parser/first-load-tab").then((mod) => ({
      default: mod.FirstLoadTab,
    })),
  {
    loading: () => <AnalysisSkeleton />,
  }
);

const PageSizeTab = dynamic(
  () =>
    import("@/components/build-parser/page-size-tab").then((mod) => ({
      default: mod.PageSizeTab,
    })),
  {
    loading: () => <AnalysisSkeleton />,
  }
);

const RecommendationsTab = dynamic(
  () =>
    import("@/components/build-parser/recommendations-tab").then((mod) => ({
      default: mod.RecommendationsTab,
    })),
  {
    loading: () => <DashboardSkeleton />,
  }
);

const EXAMPLE_BUILD_OUTPUT = `Route (app)                                                                                                                        Size     First Load JS

┌ ○ /_not-found                                                                                                                    880 B          89.6 kB
├ ● /[locale]                                                                                                                      2.88 kB         897 kB
├   ├ /en
├   ├ /id
├   └ /ar
├ ● /[locale]/auth/callback                                                                                                        6.41 kB         131 kB
├   ├ /en/auth/callback
├   ├ /id/auth/callback
├   └ /ar/auth/callback
├ ● /[locale]/dashboard                                                                                                            43.4 kB        1.18 MB
├   ├ /en/dashboard
├   ├ /id/dashboard
├   └ /ar/dashboard
├ ƒ /[locale]/dashboard/ai/summary-performance/[programId]                                                                         13.4 kB         165 kB
├ ● /[locale]/login                                                                                                                9.74 kB         185 kB
├   ├ /en/login
├   ├ /id/login
├   └ /ar/login
└ ● /[locale]/sso                                                                                                                  428 B          94.8 kB
    ├ /en/sso
    ├ /id/sso
    └ /ar/sso

+ First Load JS shared by all                                                                                                      88.7 kB`;

export default function NextJsBuildParser() {
  const [buildOutput, setBuildOutput] = useState("");
  const [activeTab, setActiveTab] = useState("recommendations");
  const scrollPositions = useRef<Record<string, number>>({});
  const tabContentRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const parsedRoutes = useMemo(() => {
    return parseNextBuildTable(buildOutput);
  }, [buildOutput]);

  const markdownTable = useMemo(() => {
    return rowsToMarkdownTable(parsedRoutes);
  }, [parsedRoutes]);

  const topHeavyRoutesByFirstLoad = useMemo(() => {
    return getTopByFirstLoad(parsedRoutes);
  }, [parsedRoutes]);

  const topHeavyRoutesBySize = useMemo(() => {
    return getTopByPageSize(parsedRoutes);
  }, [parsedRoutes]);

  const recommendations = useMemo(() => {
    return generateRecommendations(parsedRoutes);
  }, [parsedRoutes]);

  const dashboardMetrics = useMemo(() => {
    return getDashboardMetrics(parsedRoutes);
  }, [parsedRoutes]);

  // Save scroll position before tab changes
  const handleTabChange = (newTab: string) => {
    // Save current tab's scroll position
    const currentRef = tabContentRefs.current[activeTab];
    if (currentRef) {
      scrollPositions.current[activeTab] = currentRef.scrollTop;
    }
    setActiveTab(newTab);
  };

  // Restore scroll position when tab becomes active
  useEffect(() => {
    const currentRef = tabContentRefs.current[activeTab];
    if (currentRef) {
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        if (scrollPositions.current[activeTab] !== undefined) {
          currentRef.scrollTop = scrollPositions.current[activeTab];
        }
      });

      // Set up scroll listener to continuously save position
      const handleScroll = () => {
        scrollPositions.current[activeTab] = currentRef.scrollTop;
      };
      currentRef.addEventListener("scroll", handleScroll, { passive: true });
      return () => {
        currentRef.removeEventListener("scroll", handleScroll);
      };
    }
  }, [activeTab]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Next.js Build Parser & Analyzer",
    description:
      "Free online tool to parse and analyze Next.js build output. Understand route sizes, bundle distribution, first load JS, and get optimization recommendations.",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Parse Next.js build output",
      "Analyze route sizes",
      "Bundle distribution analysis",
      "First Load JS metrics",
      "Optimization recommendations",
    ],
  };

  return (
    <article className="space-y-8 max-w-7xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <header className="relative space-y-4">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-linear-to-br from-cyan-500/20 via-blue-500/20 to-purple-500/20 border border-accent/20 shadow-lg shadow-accent/5">
            <FileCode className="h-8 w-8 text-accent" />
          </div>
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-bold tracking-tight bg-linear-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
                Next.js Build Parser
              </h1>
              <div className="px-2.5 py-1 rounded-full bg-accent/10 border border-accent/20 text-xs font-semibold text-accent flex items-center gap-1.5">
                <Zap className="h-3 w-3" />
                Analyzer
              </div>
            </div>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl">
              Analyze your Next.js build output to understand route sizes,
              bundle distribution, and get optimization recommendations. Paste
              your build output from the{" "}
              <code className="px-2 py-1 bg-muted/80 rounded-md text-sm font-mono border border-border/50 text-foreground">
                next build
              </code>{" "}
              command to get detailed insights into your application&apos;s
              bundle structure and performance metrics.
            </p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-accent/5 via-transparent to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="flex flex-col h-full border-2 border-border/50 shadow-lg shadow-black/5 dark:shadow-black/20 bg-linear-to-br from-card via-card to-card/95 overflow-hidden">
          <CardHeader className="border-b border-border/40 bg-linear-to-r from-accent/5 via-transparent to-transparent">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-linear-to-br from-accent/20 to-accent/10 border border-accent/20">
                <FileCode className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h2 className="text-xl font-semibold leading-none tracking-tight">
                  Build Output
                </h2>
                <CardDescription className="mt-1.5">
                  Paste your Next.js build output from{" "}
                  <code className="px-1.5 py-0.5 bg-muted rounded text-xs">
                    next build
                  </code>{" "}
                  to analyze routes, bundle sizes, and performance metrics.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col min-h-0 p-6">
            <Textarea
              placeholder="Paste your Next.js build output here (from 'next build' command)..."
              value={buildOutput}
              onChange={(e) => {
                setBuildOutput(e.target.value);
              }}
              className="font-mono text-sm resize-none h-full min-h-[400px] border-2 focus:border-accent/50 transition-colors"
            />
            {buildOutput && (
              <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                <span>{buildOutput.split("\n").length} lines parsed</span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="flex flex-col h-full border-2 border-border/50 shadow-lg shadow-black/5 dark:shadow-black/20 bg-linear-to-br from-card via-card to-card/95 overflow-hidden">
          <CardHeader className="border-b border-border/40 bg-linear-to-r from-muted/30 via-transparent to-transparent">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-muted/50 border border-border/50">
                <Sparkles className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <h2 className="text-lg font-semibold leading-none tracking-tight">
                  Example Output
                </h2>
                <CardDescription className="text-xs mt-1.5">
                  Reference format for Next.js build output
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col min-h-0 p-6">
            <div className="relative h-full min-h-[400px]">
              <pre className="font-mono text-xs text-muted-foreground overflow-auto bg-muted/30 p-4 rounded-lg border-2 border-border/50 h-full backdrop-blur-sm">
                {EXAMPLE_BUILD_OUTPUT}
              </pre>
              <div className="absolute top-2 right-2 px-2 py-1 rounded-md bg-background/80 backdrop-blur-sm border border-border/50 text-xs text-muted-foreground">
                Example
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-2 border-border/50 shadow-xl shadow-black/5 dark:shadow-black/20 bg-linear-to-br from-card via-card to-card/95 overflow-hidden">
        <CardHeader className="border-b border-border/40 bg-linear-to-r from-accent/5 via-transparent to-transparent">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-linear-to-br from-accent/20 via-accent/15 to-accent/10 border border-accent/20 shadow-md shadow-accent/5">
              <BarChart3 className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold leading-none tracking-tight">
                Build Analysis & Insights
              </h2>
              <CardDescription className="mt-2">
                Detailed analysis of your Next.js build including route metrics,
                bundle distribution, and optimization recommendations
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {parsedRoutes.length > 0 ? (
            <Tabs
              value={activeTab}
              onValueChange={handleTabChange}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-4 bg-muted/50 p-1.5 rounded-lg border border-border/50">
                <TabsTrigger
                  value="recommendations"
                  className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-accent/20"
                >
                  <Lightbulb className="h-4 w-4" />
                  <span className="hidden sm:inline">Recommendations</span>
                  <span className="sm:hidden">Tips</span>
                </TabsTrigger>
                <TabsTrigger
                  value="first-load"
                  className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-accent/20"
                >
                  <TrendingUp className="h-4 w-4" />
                  <span className="hidden sm:inline">First Load</span>
                  <span className="sm:hidden">Load</span>
                </TabsTrigger>
                <TabsTrigger
                  value="page-size"
                  className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-accent/20"
                >
                  <Package className="h-4 w-4" />
                  <span className="hidden sm:inline">Page Size</span>
                  <span className="sm:hidden">Size</span>
                </TabsTrigger>
                <TabsTrigger
                  value="all"
                  className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-accent/20"
                >
                  <List className="h-4 w-4" />
                  <span className="hidden sm:inline">All Routes</span>
                  <span className="sm:hidden">All</span>
                </TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-4">
                <div
                  ref={(el) => {
                    tabContentRefs.current["all"] = el;
                  }}
                  className="max-h-[600px] overflow-auto"
                >
                  <AllRoutesTab content={markdownTable} />
                </div>
              </TabsContent>
              <TabsContent value="first-load" className="mt-4">
                <div
                  ref={(el) => {
                    tabContentRefs.current["first-load"] = el;
                  }}
                  className="max-h-[600px] overflow-auto"
                >
                  <FirstLoadTab routes={topHeavyRoutesByFirstLoad} />
                </div>
              </TabsContent>
              <TabsContent value="page-size" className="mt-4">
                <div
                  ref={(el) => {
                    tabContentRefs.current["page-size"] = el;
                  }}
                  className="max-h-[600px] overflow-auto"
                >
                  <PageSizeTab routes={topHeavyRoutesBySize} />
                </div>
              </TabsContent>
              <TabsContent value="recommendations" className="mt-4">
                <div
                  ref={(el) => {
                    tabContentRefs.current["recommendations"] = el;
                  }}
                  className="max-h-[600px] overflow-auto"
                >
                  <RecommendationsTab
                    dashboardMetrics={dashboardMetrics}
                    recommendations={recommendations}
                  />
                </div>
              </TabsContent>
            </Tabs>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
              <div className="p-4 rounded-full bg-muted/50 mb-4">
                <FileCode className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-sm max-w-md">
                Paste your Next.js build output above to see detailed analysis
                and optimization recommendations.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </article>
  );
}
