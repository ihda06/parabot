"use client";

import { useMemo, useState } from "react";
import { GitCompare, FileText, Sparkles, Zap } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { computeDiff } from "@/lib/text-diff";
import Show from "@/components/ui/show";
import { UnifiedDiff } from "@/components/text-diff/diff-visualization";
import { SideBySideDiff } from "@/components/text-diff/side-by-side-diff";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Layout, Split } from "lucide-react";

export default function TextDiff() {
  const [oldText, setOldText] = useState("");
  const [newText, setNewText] = useState("");
  const [viewMode, setViewMode] = useState<"unified" | "side-by-side">(
    "unified"
  );

  const diffResult = useMemo(() => {
    if (!oldText && !newText) {
      return null;
    }
    return computeDiff(oldText, newText);
  }, [oldText, newText]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Text Diff Tool",
    description:
      "Free online tool to compare and visualize differences between two text inputs. See line-by-line changes with color-coded additions and deletions.",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Compare two text inputs",
      "Visual diff with color coding",
      "Line-by-line comparison",
      "Real-time diff computation",
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
            <GitCompare className="h-8 w-8 text-accent" />
          </div>
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-bold tracking-tight bg-linear-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
                Text Diff
              </h1>
              <div className="px-2.5 py-1 rounded-full bg-accent/10 border border-accent/20 text-xs font-semibold text-accent flex items-center gap-1.5">
                <Zap className="h-3 w-3" />
                Compare
              </div>
            </div>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl">
              Compare two text inputs side-by-side and visualize differences
              with color-coded line changes. Perfect for comparing code,
              documents, or any text content. All processing happens in your
              browser.
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
                <FileText className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h2 className="text-xl font-semibold leading-none tracking-tight">
                  Original Text
                </h2>
                <CardDescription className="mt-1.5">
                  Enter or paste the original text you want to compare
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col min-h-0 p-6">
            <Textarea
              placeholder="Enter original text here..."
              value={oldText}
              onChange={(e) => {
                setOldText(e.target.value);
              }}
              className="font-mono text-sm resize-none h-full min-h-[400px] border-2 focus:border-accent/50 transition-colors"
            />
            <Show when={!!oldText}>
              <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
                <span>{oldText.split("\n").length} lines</span>
              </div>
            </Show>
          </CardContent>
        </Card>

        <Card className="flex flex-col h-full border-2 border-border/50 shadow-lg shadow-black/5 dark:shadow-black/20 bg-linear-to-br from-card via-card to-card/95 overflow-hidden">
          <CardHeader className="border-b border-border/40 bg-linear-to-r from-muted/30 via-transparent to-transparent">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-muted/50 border border-border/50">
                <FileText className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <h2 className="text-lg font-semibold leading-none tracking-tight">
                  New Text
                </h2>
                <CardDescription className="text-xs mt-1.5">
                  Enter or paste the new text to compare against
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col min-h-0 p-6">
            <Textarea
              placeholder="Enter new text here..."
              value={newText}
              onChange={(e) => {
                setNewText(e.target.value);
              }}
              className="font-mono text-sm resize-none h-full min-h-[400px] border-2 focus:border-accent/50 transition-colors"
            />
            <Show when={!!newText}>
              <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                <span>{newText.split("\n").length} lines</span>
              </div>
            </Show>
          </CardContent>
        </Card>
      </div>

      <Card className="border-2 border-border/50 shadow-xl shadow-black/5 dark:shadow-black/20 bg-linear-to-br from-card via-card to-card/95 overflow-hidden">
        <CardHeader className="border-b border-border/40 bg-linear-to-r from-accent/5 via-transparent to-transparent">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-linear-to-br from-accent/20 via-accent/15 to-accent/10 border border-accent/20 shadow-md shadow-accent/5">
              <GitCompare className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold leading-none tracking-tight">
                Diff Visualization
              </h2>
              <CardDescription className="mt-2">
                Visual comparison showing additions, deletions, and unchanged
                lines
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <Show
            when={!!diffResult}
            fallback={
              <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                <div className="p-4 rounded-full bg-muted/50 mb-4">
                  <GitCompare className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground text-sm max-w-md mb-4">
                  Enter text in both fields above to see the visual diff
                  comparison.
                </p>
                <div className="mt-4 p-4 rounded-lg bg-muted/30 border border-border/50 text-left max-w-md">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-accent" />
                    <span className="text-sm font-semibold">Example:</span>
                  </div>
                  <div className="text-xs text-muted-foreground space-y-2 font-mono">
                    <div>
                      <span className="text-red-600 dark:text-red-400">-</span>{" "}
                      Red lines indicate removed content
                    </div>
                    <div>
                      <span className="text-green-600 dark:text-green-400">
                        +
                      </span>{" "}
                      Green lines indicate added content
                    </div>
                    <div>
                      <span className="text-muted-foreground">=</span> Unchanged
                      lines appear normally
                    </div>
                  </div>
                </div>
              </div>
            }
          >
            <Tabs
              value={viewMode}
              onValueChange={(value) =>
                setViewMode(value as "unified" | "side-by-side")
              }
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 bg-muted/50 p-1.5 rounded-lg border border-border/50 mb-4">
                <TabsTrigger
                  value="unified"
                  className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-accent/20"
                >
                  <Layout className="h-4 w-4" />
                  <span>Unified</span>
                </TabsTrigger>
                <TabsTrigger
                  value="side-by-side"
                  className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-accent/20"
                >
                  <Split className="h-4 w-4" />
                  <span>Side by Side</span>
                </TabsTrigger>
              </TabsList>
              <TabsContent value="unified" className="mt-0">
                <UnifiedDiff diffResult={diffResult!} />
              </TabsContent>
              <TabsContent value="side-by-side" className="mt-0">
                <SideBySideDiff diffResult={diffResult!} />
              </TabsContent>
            </Tabs>
          </Show>
        </CardContent>
      </Card>
    </article>
  );
}
