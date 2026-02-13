import type { AlgoliaResponse, HnItem, HnListResponse } from "@/types/hn";

const HN_BASE_URL = "https://hacker-news.firebaseio.com/v0";
const ALGOLIA_URL = "https://hn.algolia.com/api/v1/search";

const fetchJson = async <T,>(url: string, revalidate = 60): Promise<T> => {
  const response = await fetch(url, {
    next: { revalidate },
  });
  if (!response.ok) {
    throw new Error(`Fetch failed: ${response.status}`);
  }
  return (await response.json()) as T;
};

export const fetchItem = async (id: number) =>
  fetchJson<HnItem>(`${HN_BASE_URL}/item/${id}.json`, 300);

export const fetchList = async (
  list: "top" | "new" | "best",
  page: number,
  limit: number
): Promise<HnListResponse> => {
  const ids = await fetchJson<number[]>(
    `${HN_BASE_URL}/${list}stories.json`,
    60
  );
  const start = page * limit;
  const slice = ids.slice(start, start + limit);
  const items = await Promise.all(slice.map((id) => fetchItem(id)));

  return {
    list,
    page,
    limit,
    total: ids.length,
    items: items.filter(Boolean),
  };
};

export const searchHn = async (
  query: string,
  page: number
): Promise<AlgoliaResponse> => {
  const url = `${ALGOLIA_URL}?query=${encodeURIComponent(query)}&page=${page}`;
  return fetchJson<AlgoliaResponse>(url, 60);
};

export const fetchItemTree = async (
  id: number,
  depth: number,
  budget: number
): Promise<{ item: HnItem | null; remaining: number }> => {
  if (budget <= 0) return { item: null, remaining: 0 };

  const item = await fetchItem(id);
  if (!item) return { item: null, remaining: budget };

  let remaining = budget - 1;

  if (depth > 0 && Array.isArray(item.kids) && item.kids.length > 0) {
    const children: HnItem[] = [];
    for (const kidId of item.kids) {
      if (remaining <= 0) break;
      const child = await fetchItemTree(Number(kidId), depth - 1, remaining);
      if (child.item) {
        children.push(child.item);
      }
      remaining = child.remaining;
    }
    item.kids = children;
  }

  return { item, remaining };
};
