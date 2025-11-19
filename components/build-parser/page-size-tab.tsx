"use client";

import { Markdown } from "@/components/markdown";
import { RouteRow } from "@/lib/build-parser";
import { rowsToMarkdownTable } from "@/lib/build-parser";

interface PageSizeTabProps {
  routes: RouteRow[];
}

export function PageSizeTab({ routes }: PageSizeTabProps) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold">
        Top {routes.length} Routes by Page Size
      </h3>
      <Markdown content={rowsToMarkdownTable(routes)} />
    </div>
  );
}

