"use client";

import Link from "next/link";
import { Bot, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showIcon?: boolean;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className, showIcon = true, size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
  };

  const iconSizes = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-2 group transition-all duration-200",
        className
      )}
    >
      {showIcon && (
        <div className="relative">
          <div className="relative p-1.5 rounded-lg bg-accent/10 border border-accent/40 backdrop-blur-sm group-hover:bg-accent/15 group-hover:border-accent/60 transition-all duration-200">
            <Bot className={cn(iconSizes[size], "text-accent")} />
          </div>
          <div className="absolute -top-0.5 -right-0.5">
            <Sparkles className="h-2.5 w-2.5 text-accent animate-pulse" />
          </div>
        </div>
      )}
      <span
        className={cn(
          "font-bold tracking-tight relative inline-block",
          sizeClasses[size]
        )}
      >
        <span className="bg-linear-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
          ParaBot
        </span>
        <span
          className={cn(
            "absolute inset-0 bg-linear-to-r from-accent via-accent to-accent/70 bg-clip-text text-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          )}
        >
          ParaBot
        </span>
      </span>
    </Link>
  );
}
