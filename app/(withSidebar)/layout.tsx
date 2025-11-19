"use client";

import { Sidebar } from "@/components/sidebar";
import { useSidebarStore } from "@/lib/store/sidebar-store";
import { cn } from "@/lib/utils";

export default function WithSidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isMinimized } = useSidebarStore();

  return (
    <div className="flex flex-1">
      <Sidebar />
      <div
        className={cn(
          "flex-1 transition-all duration-300",
          isMinimized ? "md:ml-20" : "md:ml-72"
        )}
      >
        <div className="container mx-auto px-4 py-8">{children}</div>
      </div>
    </div>
  );
}
