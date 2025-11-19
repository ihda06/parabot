"use client";

export function TableSkeleton() {
  return (
    <div className="space-y-3 animate-pulse">
      {/* Header */}
      <div className="flex gap-4 border-b pb-3">
        <div className="h-4 bg-muted rounded w-12" />
        <div className="h-4 bg-muted rounded flex-1" />
        <div className="h-4 bg-muted rounded w-32" />
        <div className="h-4 bg-muted rounded w-24" />
      </div>
      {/* Rows */}
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="flex gap-4 py-2">
          <div className="h-4 bg-muted rounded w-12" />
          <div className="h-4 bg-muted rounded flex-1" />
          <div className="h-4 bg-muted rounded w-32" />
          <div className="h-4 bg-muted rounded w-24" />
        </div>
      ))}
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-lg border bg-card p-6 space-y-3">
            <div className="h-4 bg-muted rounded w-24" />
            <div className="h-8 bg-muted rounded w-20" />
            <div className="h-3 bg-muted rounded w-32" />
          </div>
        ))}
      </div>

      {/* Route Types Distribution */}
      <div className="rounded-lg border bg-card p-6 space-y-4">
        <div className="h-6 bg-muted rounded w-48" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-muted rounded w-20" />
              <div className="h-2 bg-muted rounded-full" />
              <div className="h-3 bg-muted rounded w-16" />
            </div>
          ))}
        </div>
      </div>

      {/* Size Distribution */}
      <div className="rounded-lg border bg-card p-6 space-y-4">
        <div className="h-6 bg-muted rounded w-48" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-muted rounded w-32" />
              <div className="h-8 bg-muted rounded w-16" />
              <div className="h-3 bg-muted rounded w-24" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AnalysisSkeleton() {
  return (
    <div className="space-y-2 animate-pulse">
      <div className="h-5 bg-muted rounded w-48 mb-4" />
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="rounded-md bg-muted/50 border p-3 space-y-2">
          <div className="h-4 bg-muted rounded w-full" />
          <div className="h-4 bg-muted rounded w-3/4" />
        </div>
      ))}
    </div>
  );
}
