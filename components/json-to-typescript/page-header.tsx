"use client";

import { Code2, Zap } from "lucide-react";

export function PageHeader() {
  return (
    <>
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
              Perfect for generating type definitions from API responses,
              configuration files, or any JSON data. All processing happens in
              your browser.
            </p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-accent/5 via-transparent to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      </header>
    </>
  );
}
