"use client";

import { Markdown } from "@/components/markdown";
import { RouteRow } from "@/lib/build-parser";
import { rowsToMarkdownTable } from "@/lib/build-parser";

interface FirstLoadTabProps {
  routes: RouteRow[];
}

export function FirstLoadTab({ routes }: FirstLoadTabProps) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold">
        Top {routes.length} Routes by First Load JS
      </h3>
      <Markdown content={rowsToMarkdownTable(routes)} />
    </div>
  );
}

