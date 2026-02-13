import type { HnItem } from "@/types/hn";

export type Filters = {
  minScore: number;
  minComments: number;
  timeRange: "all" | "24h" | "7d" | "30d";
  domain: string;
};

const getValue = (
  searchParams?: Record<string, string | string[] | undefined>,
  key?: string
) => {
  if (!searchParams || !key) return undefined;
  const raw = searchParams[key];
  return Array.isArray(raw) ? raw[0] : raw;
};

export const parseFilters = (
  searchParams?: Record<string, string | string[] | undefined>
): Filters => {
  const minScore = Math.max(parseInt(getValue(searchParams, "minScore") ?? "0", 10) || 0, 0);
  const minComments = Math.max(
    parseInt(getValue(searchParams, "minComments") ?? "0", 10) || 0,
    0
  );
  const timeRange =
    (getValue(searchParams, "timeRange") as Filters["timeRange"]) ?? "all";
  const domain = (getValue(searchParams, "domain") ?? "").trim();

  return {
    minScore,
    minComments,
    timeRange: ["24h", "7d", "30d", "all"].includes(timeRange) ? timeRange : "all",
    domain,
  };
};

export const filtersActive = (filters: Filters) =>
  filters.minScore > 0 ||
  filters.minComments > 0 ||
  filters.timeRange !== "all" ||
  filters.domain.length > 0;

const getHost = (url?: string) => {
  if (!url) return null;
  try {
    return new URL(url).hostname.replace("www.", "").toLowerCase();
  } catch {
    return null;
  }
};

export const applyFilters = (items: HnItem[], filters: Filters) => {
  const now = Math.floor(Date.now() / 1000);
  let cutoff = 0;
  if (filters.timeRange === "24h") cutoff = now - 60 * 60 * 24;
  if (filters.timeRange === "7d") cutoff = now - 60 * 60 * 24 * 7;
  if (filters.timeRange === "30d") cutoff = now - 60 * 60 * 24 * 30;

  return items.filter((item) => {
    const score = item.score ?? 0;
    const comments = item.descendants ?? 0;
    const host = getHost(item.url);

    if (score < filters.minScore) return false;
    if (comments < filters.minComments) return false;
    if (cutoff && (!item.time || item.time < cutoff)) return false;
    if (filters.domain) {
      if (!host) return false;
      if (!host.includes(filters.domain.toLowerCase())) return false;
    }
    return true;
  });
};
