"use client";

import { useMemo, useState } from "react";
import { Code2, FileText, Sparkles, Zap, Copy, Check } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { convertJsonToTypeScript, type TypeStructure } from "@/lib/json-to-typescript";
import Show from "@/components/ui/show";

const EXAMPLE_JSON = `{
  "name": "John Doe",
  "age": 30,
  "email": "john@example.com",
  "isActive": true,
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "zipCode": "10001"
  },
  "hobbies": ["reading", "coding", "traveling"],
  "scores": [95, 87, 92]
}`;

export default function JsonToTypeScript() {
  const [jsonInput, setJsonInput] = useState("");
  const [rootName, setRootName] = useState("Root");
  const [typeStructure, setTypeStructure] = useState<TypeStructure>("single");
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    if (!jsonInput.trim()) {
      return null;
    }
    return convertJsonToTypeScript(jsonInput, {
      rootName: rootName || "Root",
      useTypeAlias: false,
      makeOptional: false,
      typeStructure,
    });
  }, [jsonInput, rootName, typeStructure]);

  const handleCopy = async () => {
    if (result?.output) {
      await navigator.clipboard.writeText(result.output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleLoadExample = () => {
    setJsonInput(EXAMPLE_JSON);
    setRootName("User");
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "JSON to TypeScript Converter",
    description:
      "Free online tool to convert JSON objects to TypeScript interfaces and types. Generate type definitions from JSON data instantly.",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Convert JSON to TypeScript",
      "Generate interfaces and types",
      "Support for nested objects",
      "Array type inference",
      "Real-time conversion",
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
            <Code2 className="h-8 w-8 text-accent" />
          </div>
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-bold tracking-tight bg-linear-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
                JSON to TypeScript
              </h1>
              <div className="px-2.5 py-1 rounded-full bg-accent/10 border border-accent/20 text-xs font-semibold text-accent flex items-center gap-1.5">
                <Zap className="h-3 w-3" />
                Converter
              </div>
            </div>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl">
              Convert JSON objects to TypeScript interfaces and types instantly.
              Perfect for generating type definitions from API responses, configuration
              files, or any JSON data. All processing happens in your browser.
            </p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-accent/5 via-transparent to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="flex flex-col h-full border-2 border-border/50 shadow-lg shadow-black/5 dark:shadow-black/20 bg-linear-to-br from-card via-card to-card/95 overflow-hidden">
          <CardHeader className="border-b border-border/40 bg-linear-to-r from-accent/5 via-transparent to-transparent">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-linear-to-br from-accent/20 to-accent/10 border border-accent/20">
                  <FileText className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold leading-none tracking-tight">
                    JSON Input
                  </h2>
                  <CardDescription className="mt-1.5">
                    Paste or enter your JSON data
                  </CardDescription>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLoadExample}
                className="text-xs"
              >
                Load Example
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col min-h-0 p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="root-name" className="text-sm font-medium">
                  Interface/Type Name
                </Label>
                <Input
                  id="root-name"
                  placeholder="Root"
                  value={rootName}
                  onChange={(e) => setRootName(e.target.value)}
                  className="font-mono"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type-structure" className="text-sm font-medium">
                  Type Structure
                </Label>
                <select
                  id="type-structure"
                  value={typeStructure}
                  onChange={(e) => setTypeStructure(e.target.value as TypeStructure)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  title={
                    typeStructure === "single"
                      ? "One interface with inline nested types"
                      : typeStructure === "separated"
                      ? "Separate interfaces for nested objects"
                      : "Inline type without interface/type wrapper"
                  }
                >
                  <option value="single">Single Type</option>
                  <option value="separated">Separated Types</option>
                  <option value="inline">Inline/Monotype</option>
                </select>
                <p className="text-xs text-muted-foreground">
                  {typeStructure === "single"
                    ? "One interface with inline nested types"
                    : typeStructure === "separated"
                    ? "Separate interfaces for nested objects"
                    : "Inline type without interface/type wrapper"}
                </p>
              </div>
            </div>
            <div className="flex-1 flex flex-col min-h-0">
              <Textarea
                placeholder="Paste your JSON here..."
                value={jsonInput}
                onChange={(e) => {
                  setJsonInput(e.target.value);
                }}
                className="font-mono text-sm resize-none h-full min-h-[400px] border-2 focus:border-accent/50 transition-colors"
              />
              <Show when={!!jsonInput}>
                <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
                  <span>
                    {jsonInput.split("\n").length} lines
                    {result?.error ? (
                      <span className="text-red-500 ml-2">• Invalid JSON</span>
                    ) : result?.output ? (
                      <span className="text-green-500 ml-2">• Valid JSON</span>
                    ) : null}
                  </span>
                </div>
              </Show>
            </div>
          </CardContent>
        </Card>

        <Card className="flex flex-col h-full border-2 border-border/50 shadow-lg shadow-black/5 dark:shadow-black/20 bg-linear-to-br from-card via-card to-card/95 overflow-hidden">
          <CardHeader className="border-b border-border/40 bg-linear-to-r from-muted/30 via-transparent to-transparent">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-muted/50 border border-border/50">
                  <Code2 className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold leading-none tracking-tight">
                    TypeScript Output
                  </h2>
                  <CardDescription className="text-xs mt-1.5">
                    Generated TypeScript interface/type
                  </CardDescription>
                </div>
              </div>
              <Show when={!!result?.output}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopy}
                  className="text-xs"
                >
                  {copied ? (
                    <>
                      <Check className="h-3 w-3 mr-1" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3 mr-1" />
                      Copy
                    </>
                  )}
                </Button>
              </Show>
            </div>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col min-h-0 p-6">
            <Show
              when={!!result?.output}
              fallback={
                <div className="flex flex-col items-center justify-center py-16 px-4 text-center flex-1">
                  <div className="p-4 rounded-full bg-muted/50 mb-4">
                    <Code2 className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground text-sm max-w-md mb-4">
                    {result?.error
                      ? result.error
                      : "Enter JSON in the left field to generate TypeScript types."}
                  </p>
                  <Show when={!result?.error}>
                    <div className="mt-4 p-4 rounded-lg bg-muted/30 border border-border/50 text-left max-w-md">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="h-4 w-4 text-accent" />
                        <span className="text-sm font-semibold">Features:</span>
                      </div>
                      <div className="text-xs text-muted-foreground space-y-2">
                        <div>✓ Automatic type inference</div>
                        <div>✓ Nested object support</div>
                        <div>✓ Array type detection</div>
                        <div>✓ Valid identifier handling</div>
                      </div>
                    </div>
                  </Show>
                </div>
              }
            >
              <div className="flex-1 flex flex-col min-h-0">
                <div className="flex-1 overflow-auto rounded-lg bg-muted/30 border border-border/50 p-4">
                  <pre className="text-sm font-mono text-foreground whitespace-pre-wrap break-words">
                    <code>{result?.output}</code>
                  </pre>
                </div>
              </div>
            </Show>
          </CardContent>
        </Card>
      </div>
    </article>
  );
}

