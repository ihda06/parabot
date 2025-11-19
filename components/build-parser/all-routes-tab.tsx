"use client";

import { Markdown } from "@/components/markdown";

interface AllRoutesTabProps {
  content: string;
}

export function AllRoutesTab({ content }: AllRoutesTabProps) {
  return <Markdown content={content} />;
}

