"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileCode, GitCompare, Code2, Wrench, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

const tools = [
  {
    name: "Build Parser",
    href: "/tools/build-parser",
    icon: FileCode,
    description: "Analyze Next.js builds",
    color: "from-cyan-500 to-blue-500",
  },
  {
    name: "Text Diff",
    href: "/tools/text-diff",
    icon: GitCompare,
    description: "Compare text differences",
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "JSON to TypeScript",
    href: "/tools/json-to-typescript",
    icon: Code2,
    description: "Convert JSON to TypeScript",
    color: "from-green-500 to-emerald-500",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 md:pt-16">
      <div className="flex flex-col grow border-r border-border/40 bg-linear-to-b from-background/98 via-background/95 to-background/98 backdrop-blur supports-backdrop-filter:bg-background/80">
        <div className="px-4 pt-6 pb-4 border-b border-border/40">
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 rounded-lg bg-linear-to-br from-accent/20 to-accent/10 border border-accent/20">
              <Wrench className="h-4 w-4 text-accent" />
            </div>
            <h2 className="text-sm font-semibold text-foreground">Tools</h2>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Developer utilities & analyzers
          </p>
        </div>
        <ScrollArea className="flex-1  py-4">
          <nav className="space-y-2 px-3">
            {tools.map((tool) => {
              const isActive = pathname === tool.href;
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className={cn(
                    "group relative block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                    "hover:scale-[1.02] active:scale-[0.98]",
                    isActive
                      ? "bg-linear-to-br from-accent/15 via-accent/10 to-accent/5 text-accent shadow-sm shadow-accent/10 border border-accent/20"
                      : "text-foreground/70 hover:bg-accent/5 hover:text-foreground border border-transparent hover:border-accent/10"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "p-2 rounded-md transition-all duration-200",
                        isActive
                          ? `bg-linear-to-br ${tool.color} text-white shadow-md`
                          : "bg-muted/50 text-muted-foreground group-hover:bg-accent/10 group-hover:text-accent"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold leading-none mb-1">
                        {tool.name}
                      </div>
                      <div
                        className={cn(
                          "text-xs leading-tight truncate",
                          isActive
                            ? "text-accent/80"
                            : "text-muted-foreground group-hover:text-foreground/60"
                        )}
                      >
                        {tool.description}
                      </div>
                    </div>
                    {isActive && (
                      <div className="absolute right-2 top-1/2 -translate-y-1/2">
                        <Sparkles className="h-3.5 w-3.5 text-accent animate-pulse" />
                      </div>
                    )}
                  </div>
                  {isActive && (
                    <div className="absolute inset-0 rounded-lg bg-linear-to-r from-accent/5 via-transparent to-transparent pointer-events-none" />
                  )}
                </Link>
              );
            })}
          </nav>
        </ScrollArea>
        <div className="px-4 py-3 border-t border-border/40">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="h-1.5 w-1.5 rounded-full bg-accent/60 animate-pulse" />
            <span>More tools coming soon</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
