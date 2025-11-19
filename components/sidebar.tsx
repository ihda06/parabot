"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileCode,
  GitCompare,
  Code2,
  Wrench,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSidebarStore } from "@/lib/store/sidebar-store";
import { Button } from "@/components/ui/button";

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
  const { isMinimized, toggle } = useSidebarStore();

  return (
    <aside
      className={cn(
        "hidden md:flex md:flex-col md:fixed md:inset-y-0 md:pt-16 transition-all duration-300",
        isMinimized ? "md:w-20" : "md:w-72"
      )}
    >
      <div className="relative flex flex-col grow border-r border-border/40 bg-linear-to-b from-background/98 via-background/95 to-background/98 backdrop-blur supports-backdrop-filter:bg-background/80">
        {/* Floating minimize button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggle}
          className={cn(
            "absolute top-6.5 -right-3 z-10 h-7 w-7 rounded-md",
            "bg-background/80 backdrop-blur-sm border border-border/40",
            "hover:bg-accent/10 hover:border-accent/20",
            "shadow-sm transition-all duration-200",
            "hover:scale-110 active:scale-95",
            "text-muted-foreground hover:text-accent"
          )}
          title={isMinimized ? "Expand sidebar" : "Minimize sidebar"}
        >
          {isMinimized ? (
            <ChevronRight className="h-3.5 w-3.5" />
          ) : (
            <ChevronLeft className="h-3.5 w-3.5" />
          )}
        </Button>
        <div
          className={cn(
            "border-b border-border/40 transition-all duration-300",
            isMinimized ? "px-3 pt-6 pb-4" : "px-4 pt-6 pb-4"
          )}
        >
          <div
            className={cn(
              "flex items-center gap-2 mb-1 transition-all duration-300",
              isMinimized && "justify-center"
            )}
          >
            <div className="p-1.5 rounded-lg bg-linear-to-br from-accent/20 to-accent/10 border border-accent/20">
              <Wrench className="h-4 w-4 text-accent" />
            </div>
            {!isMinimized && (
              <h2 className="text-sm font-semibold text-foreground">Tools</h2>
            )}
          </div>
          {!isMinimized && (
            <p className="text-xs text-muted-foreground mt-1">
              Developer utilities & analyzers
            </p>
          )}
        </div>
        <ScrollArea className="flex-1 py-4">
          <nav
            className={cn(
              "space-y-2 transition-all duration-300",
              isMinimized ? "px-2" : "px-3"
            )}
          >
            {tools.map((tool) => {
              const isActive = pathname === tool.href;
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className={cn(
                    "group relative block rounded-lg text-sm font-medium transition-all duration-200",
                    "hover:scale-[1.02] active:scale-[0.98]",
                    isMinimized ? "px-2 py-3" : "px-4 py-3",
                    isActive
                      ? "bg-linear-to-br from-accent/15 via-accent/10 to-accent/5 text-accent shadow-sm shadow-accent/10 border border-accent/20"
                      : "text-foreground/70 hover:bg-accent/5 hover:text-foreground border border-transparent hover:border-accent/10"
                  )}
                  title={isMinimized ? tool.name : undefined}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "p-2 rounded-md transition-all duration-200 shrink-0",
                        isActive
                          ? `bg-linear-to-br ${tool.color} text-white shadow-md`
                          : "bg-muted/50 text-muted-foreground group-hover:bg-accent/10 group-hover:text-accent"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    {!isMinimized && (
                      <>
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
                      </>
                    )}
                    {isMinimized && isActive && (
                      <div className="absolute right-1 top-1/2 -translate-y-1/2">
                        <div className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                      </div>
                    )}
                  </div>
                  {isActive && !isMinimized && (
                    <div className="absolute inset-0 rounded-lg bg-linear-to-r from-accent/5 via-transparent to-transparent pointer-events-none" />
                  )}
                </Link>
              );
            })}
          </nav>
        </ScrollArea>
        <div
          className={cn(
            "border-t border-border/40 transition-all duration-300",
            isMinimized ? "px-2 py-3" : "px-4 py-3"
          )}
        >
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="h-1.5 w-1.5 rounded-full bg-accent/60 animate-pulse" />
            {!isMinimized && <span>More tools coming soon</span>}
          </div>
        </div>
      </div>
    </aside>
  );
}
