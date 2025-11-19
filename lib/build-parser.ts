import { truncateMiddle } from "./utils";

export type RouteType = "static" | "ssg" | "dynamic" | "unknown";

export interface RouteRow {
  symbol: string; // ○, ●, ƒ
  type: RouteType; // mapped type for convenience
  route: string;
  sizeRaw: string; // e.g. "27.5 kB"
  sizeKB: number; // normalized to kB
  firstLoadJsRaw: string; // e.g. "1.33 MB"
  firstLoadJsKB: number; // normalized to kB
}

/**
 * Parse "1.33 MB", "89.6 kB", "880 B" into kB (number)
 */
function parseSizeToKB(raw: string): number {
  const match = raw.trim().match(/^([\d.]+)\s*(B|kB|MB)$/);
  if (!match) return NaN;

  const value = parseFloat(match[1]);
  const unit = match[2];

  switch (unit) {
    case "B":
      return value / 1024;
    case "kB":
      return value;
    case "MB":
      return value * 1024;
    default:
      return NaN;
  }
}

function mapSymbolToType(symbol: string): RouteType {
  switch (symbol) {
    case "○":
      return "static"; // (Static)
    case "●":
      return "ssg"; // (SSG)
    case "ƒ":
      return "dynamic"; // (Dynamic)
    default:
      return "unknown";
  }
}

/**
 * Parse the Next.js "Route (app)  Size  First Load JS" table into JSON.
 */
export function parseNextBuildTable(text: string): RouteRow[] {
  const lines = text.split(/\r?\n/);
  const rows: RouteRow[] = [];

  // Example line matched:
  // ├ ● /[locale]/pelatihan/[programId]/program                                               27.5 kB        1.33 MB
  const lineRegex =
    /^[┌├└]\s+([○●ƒ])\s+(\S+)\s+([\d.]+\s*(?:B|kB|MB))\s+([\d.]+\s*(?:B|kB|MB))/;

  for (const line of lines) {
    const m = line.match(lineRegex);
    if (!m) continue;

    const symbol = m[1];
    const route = m[2];
    const sizeRaw = m[3];
    const firstLoadJsRaw = m[4];

    rows.push({
      symbol,
      type: mapSymbolToType(symbol),
      route,
      sizeRaw,
      sizeKB: parseSizeToKB(sizeRaw),
      firstLoadJsRaw,
      firstLoadJsKB: parseSizeToKB(firstLoadJsRaw),
    });
  }

  return rows;
}

/**
 * Optional helper: get top N routes by First Load JS
 */
export function getTopByFirstLoad(rows: RouteRow[], limit = 10): RouteRow[] {
  return [...rows]
    .sort((a, b) => b.firstLoadJsKB - a.firstLoadJsKB)
    .slice(0, limit);
}

/**
 * Get top N routes by Page Size
 */
export function getTopByPageSize(rows: RouteRow[], limit = 10): RouteRow[] {
  return [...rows].sort((a, b) => b.sizeKB - a.sizeKB).slice(0, limit);
}

/**
 * Generate comprehensive recommendations based on build analysis
 */
export function generateRecommendations(rows: RouteRow[]): string[] {
  const recommendations: string[] = [];

  if (rows.length === 0) {
    return ["No routes found. Please check your build output format."];
  }

  // === OVERALL STATISTICS ===
  const totalRoutes = rows.length;
  const avgFirstLoad =
    rows.reduce((sum, r) => sum + r.firstLoadJsKB, 0) / totalRoutes;
  const avgPageSize = rows.reduce((sum, r) => sum + r.sizeKB, 0) / totalRoutes;

  recommendations.push(
    `📊 **Build Overview**: ${totalRoutes} total routes | Average First Load: ${formatKB(
      avgFirstLoad
    )} | Average Page Size: ${formatKB(avgPageSize)}`
  );

  // === ROUTE TYPE ANALYSIS ===
  const staticRoutes = rows.filter((r) => r.type === "static");
  const ssgRoutes = rows.filter((r) => r.type === "ssg");
  const dynamicRoutes = rows.filter((r) => r.type === "dynamic");

  const staticRatio = (staticRoutes.length / totalRoutes) * 100;
  const ssgRatio = (ssgRoutes.length / totalRoutes) * 100;
  const dynamicRatio = (dynamicRoutes.length / totalRoutes) * 100;

  recommendations.push(
    `🔀 **Route Types**: Static ${staticRatio.toFixed(1)}% (${
      staticRoutes.length
    }) | SSG ${ssgRatio.toFixed(1)}% (${
      ssgRoutes.length
    }) | Dynamic ${dynamicRatio.toFixed(1)}% (${dynamicRoutes.length})`
  );

  // === SIZE DISTRIBUTION ANALYSIS ===
  const sizeCategories = {
    small: rows.filter((r) => r.firstLoadJsKB < 200).length,
    medium: rows.filter((r) => r.firstLoadJsKB >= 200 && r.firstLoadJsKB < 500)
      .length,
    large: rows.filter((r) => r.firstLoadJsKB >= 500 && r.firstLoadJsKB < 1024)
      .length,
    veryLarge: rows.filter((r) => r.firstLoadJsKB >= 1024).length,
  };

  if (sizeCategories.veryLarge > 0) {
    recommendations.push(
      `⚠️ **Critical**: ${sizeCategories.veryLarge} route(s) exceed 1 MB First Load JS. These significantly impact performance and should be prioritized for optimization.`
    );
  }

  if (sizeCategories.large > 0) {
    recommendations.push(
      `📦 **Warning**: ${sizeCategories.large} route(s) between 500 kB - 1 MB. Consider code splitting, lazy loading, or removing unused dependencies.`
    );
  }

  if (sizeCategories.small > totalRoutes * 0.5) {
    recommendations.push(
      `✅ **Good**: ${((sizeCategories.small / totalRoutes) * 100).toFixed(
        1
      )}% of routes are under 200 kB, which is excellent for performance.`
    );
  }

  // === TOP HEAVY ROUTES ANALYSIS ===
  const topByFirstLoad = getTopByFirstLoad(rows, 3);
  const topBySize = getTopByPageSize(rows, 3);

  if (topByFirstLoad.length > 0) {
    const topRoute = topByFirstLoad[0];
    recommendations.push(
      `🔝 **Largest First Load JS**: \`${topRoute.route}\` (${topRoute.firstLoadJsRaw}) - Review dependencies, implement dynamic imports, and consider route-based code splitting.`
    );

    if (topByFirstLoad.length > 1) {
      const top3Avg =
        topByFirstLoad.reduce((sum, r) => sum + r.firstLoadJsKB, 0) /
        topByFirstLoad.length;
      recommendations.push(
        `📈 Top 3 routes average ${formatKB(
          top3Avg
        )} First Load JS. Focus optimization efforts on these routes for maximum impact.`
      );
    }
  }

  if (topBySize.length > 0) {
    const topRoute = topBySize[0];
    if (topRoute.sizeKB > 300) {
      recommendations.push(
        `📊 **Largest Page Size**: \`${topRoute.route}\` (${topRoute.sizeRaw}) - Consider tree-shaking, removing unused code, and splitting large components.`
      );
    }
  }

  // === DYNAMIC ROUTE ANALYSIS ===
  if (dynamicRoutes.length > 0) {
    const complexDynamicRoutes = dynamicRoutes.filter((r) => {
      const segments = r.route.split("/").filter((s) => s.startsWith("["));
      return segments.length > 1;
    });

    if (complexDynamicRoutes.length > 0) {
      recommendations.push(
        `🔄 **Complex Dynamic Routes**: ${complexDynamicRoutes.length} route(s) have multiple dynamic segments. Consider using \`generateStaticParams\` for better performance.`
      );
    }

    if (dynamicRatio > 60) {
      recommendations.push(
        `⚡ **High Dynamic Ratio**: ${dynamicRatio.toFixed(
          1
        )}% dynamic routes. Evaluate if some can be converted to SSG using \`generateStaticParams\` or ISR (Incremental Static Regeneration).`
      );
    } else if (dynamicRatio < 20 && ssgRatio > 50) {
      recommendations.push(
        `✅ **Excellent**: High SSG usage (${ssgRatio.toFixed(
          1
        )}%) with low dynamic routes. This is optimal for performance and SEO.`
      );
    }
  }

  // === STATIC GENERATION RECOMMENDATIONS ===
  if (
    staticRoutes.length === 0 &&
    ssgRoutes.length === 0 &&
    dynamicRoutes.length > 0
  ) {
    recommendations.push(
      `💡 **Optimization Opportunity**: All routes are dynamic. Consider implementing SSG for routes that don't require real-time data using \`generateStaticParams\` or ISR.`
    );
  }

  if (ssgRoutes.length > 0 && ssgRatio < 30) {
    recommendations.push(
      `💡 **SSG Expansion**: Only ${ssgRatio.toFixed(
        1
      )}% routes use SSG. Consider converting more routes to SSG for better performance, especially content-heavy pages.`
    );
  }

  // === BUNDLE SIZE OPTIMIZATION ===
  const routesOver500KB = rows.filter((r) => r.firstLoadJsKB > 500);
  if (routesOver500KB.length > totalRoutes * 0.2) {
    recommendations.push(
      `🎯 **Bundle Optimization**: ${(
        (routesOver500KB.length / totalRoutes) *
        100
      ).toFixed(
        1
      )}% of routes exceed 500 kB. Implement: 1) Dynamic imports for heavy components, 2) Route-based code splitting, 3) Remove unused dependencies.`
    );
  }

  // === SPECIFIC OPTIMIZATION TECHNIQUES ===
  const veryHeavyRoutes = rows.filter((r) => r.firstLoadJsKB > 1024);
  if (veryHeavyRoutes.length > 0) {
    const heavyRouteNames = veryHeavyRoutes
      .slice(0, 3)
      .map((r) => `\`${r.route}\``)
      .join(", ");
    recommendations.push(
      `🛠️ **Action Required**: Routes ${heavyRouteNames} need immediate attention. Techniques: 1) Use \`next/dynamic\` for heavy components, 2) Split vendor chunks, 3) Analyze bundle with \`@next/bundle-analyzer\`.`
    );
  }

  // === PERFORMANCE THRESHOLDS ===
  const routesUnder200KB = rows.filter((r) => r.firstLoadJsKB < 200);
  const routes200to500KB = rows.filter(
    (r) => r.firstLoadJsKB >= 200 && r.firstLoadJsKB < 500
  );

  if (routesUnder200KB.length > totalRoutes * 0.7) {
    recommendations.push(
      `✅ **Performance Score**: ${(
        (routesUnder200KB.length / totalRoutes) *
        100
      ).toFixed(
        1
      )}% of routes are under 200 kB (excellent). Your build is well-optimized!`
    );
  } else if (routes200to500KB.length > totalRoutes * 0.5) {
    recommendations.push(
      `📊 **Performance Score**: ${(
        (routes200to500KB.length / totalRoutes) *
        100
      ).toFixed(
        1
      )}% of routes are 200-500 kB (good). Consider further optimization for routes in this range.`
    );
  }

  // === ROUTE PATTERN ANALYSIS ===
  const apiRoutes = rows.filter((r) => r.route.includes("/api/"));
  if (apiRoutes.length > 0) {
    recommendations.push(
      `🔌 **API Routes**: ${apiRoutes.length} API route(s) detected. Ensure these are properly optimized and consider Edge Runtime for better performance.`
    );
  }

  const nestedRoutes = rows.filter((r) => r.route.split("/").length > 3);
  if (nestedRoutes.length > totalRoutes * 0.3) {
    recommendations.push(
      `🗂️ **Nested Routes**: ${(
        (nestedRoutes.length / totalRoutes) *
        100
      ).toFixed(
        1
      )}% of routes are deeply nested. Consider route organization and ensure proper code splitting at route boundaries.`
    );
  }

  // === SUMMARY AND NEXT STEPS ===
  const criticalIssues = veryHeavyRoutes.length + (dynamicRatio > 60 ? 1 : 0);
  if (criticalIssues === 0 && avgFirstLoad < 300) {
    recommendations.push(
      `✅ **Overall Assessment**: Your build is well-optimized! Average First Load JS is ${formatKB(
        avgFirstLoad
      )}, which is excellent. Keep up the good work!`
    );
  } else if (criticalIssues > 0) {
    recommendations.push(
      `🎯 **Priority Actions**: ${criticalIssues} critical issue(s) identified. Focus on: 1) Optimizing routes over 1 MB, 2) Converting dynamic routes to SSG where possible, 3) Implementing code splitting strategies.`
    );
  }

  return recommendations;
}

/**
 * Format KB value to readable string
 */
export function formatKB(kb: number): string {
  if (kb < 1) {
    return `${(kb * 1024).toFixed(0)} B`;
  } else if (kb < 1024) {
    return `${kb.toFixed(1)} kB`;
  } else {
    return `${(kb / 1024).toFixed(2)} MB`;
  }
}

/**
 * Dashboard metrics for build analysis
 */
export interface DashboardMetrics {
  overview: {
    totalRoutes: number;
    avgFirstLoad: number;
    avgPageSize: number;
    totalFirstLoad: number;
    totalPageSize: number;
  };
  routeTypes: {
    static: { count: number; ratio: number };
    ssg: { count: number; ratio: number };
    dynamic: { count: number; ratio: number };
  };
  sizeDistribution: {
    small: number;
    medium: number;
    large: number;
    veryLarge: number;
  };
  topRoutes: {
    byFirstLoad: RouteRow[];
    byPageSize: RouteRow[];
  };
  issues: {
    critical: number;
    warnings: number;
    optimizations: string[];
  };
  performance: {
    score: "excellent" | "good" | "fair" | "poor";
    routesUnder200KB: number;
    routes200to500KB: number;
  };
}

/**
 * Generate structured dashboard metrics
 */
export function getDashboardMetrics(rows: RouteRow[]): DashboardMetrics | null {
  if (rows.length === 0) {
    return null;
  }

  const totalRoutes = rows.length;
  const avgFirstLoad =
    rows.reduce((sum, r) => sum + r.firstLoadJsKB, 0) / totalRoutes;
  const avgPageSize = rows.reduce((sum, r) => sum + r.sizeKB, 0) / totalRoutes;
  const totalFirstLoad = rows.reduce((sum, r) => sum + r.firstLoadJsKB, 0);
  const totalPageSize = rows.reduce((sum, r) => sum + r.sizeKB, 0);

  const staticRoutes = rows.filter((r) => r.type === "static");
  const ssgRoutes = rows.filter((r) => r.type === "ssg");
  const dynamicRoutes = rows.filter((r) => r.type === "dynamic");

  const sizeDistribution = {
    small: rows.filter((r) => r.firstLoadJsKB < 200).length,
    medium: rows.filter((r) => r.firstLoadJsKB >= 200 && r.firstLoadJsKB < 500)
      .length,
    large: rows.filter((r) => r.firstLoadJsKB >= 500 && r.firstLoadJsKB < 1024)
      .length,
    veryLarge: rows.filter((r) => r.firstLoadJsKB >= 1024).length,
  };

  const veryHeavyRoutes = rows.filter((r) => r.firstLoadJsKB > 1024);
  const largeRoutes = rows.filter(
    (r) => r.firstLoadJsKB >= 500 && r.firstLoadJsKB < 1024
  );
  const dynamicRatio = (dynamicRoutes.length / totalRoutes) * 100;

  const routesUnder200KB = rows.filter((r) => r.firstLoadJsKB < 200);
  const routes200to500KB = rows.filter(
    (r) => r.firstLoadJsKB >= 200 && r.firstLoadJsKB < 500
  );

  let performanceScore: "excellent" | "good" | "fair" | "poor" = "fair";
  if (routesUnder200KB.length > totalRoutes * 0.7 && avgFirstLoad < 300) {
    performanceScore = "excellent";
  } else if (
    routesUnder200KB.length > totalRoutes * 0.5 ||
    (routes200to500KB.length > totalRoutes * 0.5 && avgFirstLoad < 400)
  ) {
    performanceScore = "good";
  } else if (
    avgFirstLoad > 500 ||
    sizeDistribution.veryLarge > totalRoutes * 0.1
  ) {
    performanceScore = "poor";
  }

  const optimizations: string[] = [];
  if (dynamicRatio > 60) {
    optimizations.push("Consider converting dynamic routes to SSG");
  }
  if (sizeDistribution.veryLarge > 0) {
    optimizations.push("Implement code splitting for heavy routes");
  }
  if (ssgRoutes.length < totalRoutes * 0.3) {
    optimizations.push("Expand SSG usage for better performance");
  }

  return {
    overview: {
      totalRoutes,
      avgFirstLoad,
      avgPageSize,
      totalFirstLoad,
      totalPageSize,
    },
    routeTypes: {
      static: {
        count: staticRoutes.length,
        ratio: (staticRoutes.length / totalRoutes) * 100,
      },
      ssg: {
        count: ssgRoutes.length,
        ratio: (ssgRoutes.length / totalRoutes) * 100,
      },
      dynamic: {
        count: dynamicRoutes.length,
        ratio: (dynamicRoutes.length / totalRoutes) * 100,
      },
    },
    sizeDistribution,
    topRoutes: {
      byFirstLoad: getTopByFirstLoad(rows, 5),
      byPageSize: getTopByPageSize(rows, 5),
    },
    issues: {
      critical: veryHeavyRoutes.length + (dynamicRatio > 60 ? 1 : 0),
      warnings: largeRoutes.length,
      optimizations,
    },
    performance: {
      score: performanceScore,
      routesUnder200KB: routesUnder200KB.length,
      routes200to500KB: routes200to500KB.length,
    },
  };
}

/**
 * Convert RouteRow[] into a Markdown table.
 * Columns: #, Route, First Load JS, Page Size
 */
export function rowsToMarkdownTable(rows: RouteRow[]): string {
  const header = [
    "| # | Route | First Load JS | Page Size |",
    "|---|-------|---------------|----------|",
  ].join("\n");

  const body = rows
    .map((row, index) => {
      return `| ${index + 1} | \`${truncateMiddle(row.route, 60)}\` | ${
        row.firstLoadJsRaw
      } | ${row.sizeRaw} |`;
    })
    .join("\n");

  return `${header}\n${body}`;
}
