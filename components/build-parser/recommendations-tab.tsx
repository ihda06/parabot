"use client";

import { BuildRecommendationsDashboard } from "@/components/build-recommendations-dashboard";
import { DashboardMetrics } from "@/lib/build-parser";

interface RecommendationsTabProps {
  dashboardMetrics: DashboardMetrics | null;
  recommendations: string[];
}

export function RecommendationsTab({
  dashboardMetrics,
  recommendations,
}: RecommendationsTabProps) {
  if (!dashboardMetrics) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground text-sm">
          No metrics available. Parse your build output to see dashboard
          analytics.
        </p>
      </div>
    );
  }

  return (
    <BuildRecommendationsDashboard
      dashboardMetrics={dashboardMetrics}
      recommendations={recommendations}
    />
  );
}
