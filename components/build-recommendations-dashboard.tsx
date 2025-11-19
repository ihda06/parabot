"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DashboardMetrics, formatKB } from "@/lib/build-parser";
import { Markdown } from "@/components/markdown";
import {
  BarChart3,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Package,
  Zap,
  FileCode,
  Activity,
} from "lucide-react";

interface BuildRecommendationsDashboardProps {
  dashboardMetrics: DashboardMetrics;
  recommendations: string[];
}

export function BuildRecommendationsDashboard({
  dashboardMetrics,
  recommendations,
}: BuildRecommendationsDashboardProps) {
  return (
    <div className="space-y-6">
      {/* Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Routes</CardTitle>
            <FileCode className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboardMetrics.overview.totalRoutes}
            </div>
            <p className="text-xs text-muted-foreground">Routes analyzed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg First Load
            </CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatKB(dashboardMetrics.overview.avgFirstLoad)}
            </div>
            <p className="text-xs text-muted-foreground">Average bundle size</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Performance</CardTitle>
            <Activity
              className={`h-4 w-4 ${
                dashboardMetrics.performance.score === "excellent"
                  ? "text-green-500"
                  : dashboardMetrics.performance.score === "good"
                  ? "text-blue-500"
                  : dashboardMetrics.performance.score === "fair"
                  ? "text-yellow-500"
                  : "text-red-500"
              }`}
            />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">
              {dashboardMetrics.performance.score}
            </div>
            <p className="text-xs text-muted-foreground">Build health score</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Critical Issues
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboardMetrics.issues.critical}
            </div>
            <p className="text-xs text-muted-foreground">Issues to address</p>
          </CardContent>
        </Card>
      </div>

      {/* Route Types Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Route Types Distribution
          </CardTitle>
          <CardDescription>
            Breakdown of static, SSG, and dynamic routes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Static</span>
                <span className="text-sm text-muted-foreground">
                  {dashboardMetrics.routeTypes.static.ratio.toFixed(1)}%
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500"
                  style={{
                    width: `${dashboardMetrics.routeTypes.static.ratio}%`,
                  }}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                {dashboardMetrics.routeTypes.static.count} routes
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">SSG</span>
                <span className="text-sm text-muted-foreground">
                  {dashboardMetrics.routeTypes.ssg.ratio.toFixed(1)}%
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500"
                  style={{
                    width: `${dashboardMetrics.routeTypes.ssg.ratio}%`,
                  }}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                {dashboardMetrics.routeTypes.ssg.count} routes
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Dynamic</span>
                <span className="text-sm text-muted-foreground">
                  {dashboardMetrics.routeTypes.dynamic.ratio.toFixed(1)}%
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-orange-500"
                  style={{
                    width: `${dashboardMetrics.routeTypes.dynamic.ratio}%`,
                  }}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                {dashboardMetrics.routeTypes.dynamic.count} routes
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Size Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Bundle Size Distribution
          </CardTitle>
          <CardDescription>
            Routes categorized by First Load JS size
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">Small (&lt;200 kB)</span>
              </div>
              <div className="text-2xl font-bold">
                {dashboardMetrics.sizeDistribution.small}
              </div>
              <p className="text-xs text-muted-foreground">
                {(
                  (dashboardMetrics.sizeDistribution.small /
                    dashboardMetrics.overview.totalRoutes) *
                  100
                ).toFixed(1)}
                % of routes
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium">Medium (200-500 kB)</span>
              </div>
              <div className="text-2xl font-bold">
                {dashboardMetrics.sizeDistribution.medium}
              </div>
              <p className="text-xs text-muted-foreground">
                {(
                  (dashboardMetrics.sizeDistribution.medium /
                    dashboardMetrics.overview.totalRoutes) *
                  100
                ).toFixed(1)}
                % of routes
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium">Large (500 kB-1 MB)</span>
              </div>
              <div className="text-2xl font-bold">
                {dashboardMetrics.sizeDistribution.large}
              </div>
              <p className="text-xs text-muted-foreground">
                {(
                  (dashboardMetrics.sizeDistribution.large /
                    dashboardMetrics.overview.totalRoutes) *
                  100
                ).toFixed(1)}
                % of routes
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <span className="text-sm font-medium">
                  Very Large (&gt;1 MB)
                </span>
              </div>
              <div className="text-2xl font-bold">
                {dashboardMetrics.sizeDistribution.veryLarge}
              </div>
              <p className="text-xs text-muted-foreground">
                {(
                  (dashboardMetrics.sizeDistribution.veryLarge /
                    dashboardMetrics.overview.totalRoutes) *
                  100
                ).toFixed(1)}
                % of routes
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Routes & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Top Routes by First Load JS
            </CardTitle>
            <CardDescription>Routes with largest bundle sizes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dashboardMetrics.topRoutes.byFirstLoad.map((route, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-md bg-muted/50 border"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-mono truncate">{route.route}</p>
                    <p className="text-xs text-muted-foreground">
                      {route.type.toUpperCase()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">
                      {route.firstLoadJsRaw}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {route.sizeRaw}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Optimization Recommendations
            </CardTitle>
            <CardDescription>
              Actionable insights for your build
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {dashboardMetrics.issues.optimizations.length > 0 ? (
                dashboardMetrics.issues.optimizations.map((opt, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 p-3 rounded-md bg-muted/50 border"
                  >
                    <CheckCircle2 className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                    <p className="text-sm">{opt}</p>
                  </div>
                ))
              ) : (
                <div className="flex items-center gap-2 p-3 rounded-md bg-green-500/10 border border-green-500/20">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <p className="text-sm">Your build is well-optimized!</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Analysis</CardTitle>
          <CardDescription>
            Comprehensive recommendations and insights
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {recommendations.map((rec, index) => (
              <div
                key={index}
                className="p-3 rounded-md bg-muted/50 border border-border"
              >
                <Markdown content={rec} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
