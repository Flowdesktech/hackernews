import FeedPage from "@/components/FeedPage";
import { applyFilters, filtersActive, parseFilters } from "@/lib/filters";
import { fetchList } from "@/lib/hn";

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

const getPage = (searchParams?: Record<string, string | string[] | undefined>) => {
  const raw = searchParams?.page;
  const value = Array.isArray(raw) ? raw[0] : raw;
  const parsed = parseInt(value ?? "1", 10);
  return Number.isNaN(parsed) || parsed < 1 ? 1 : parsed;
};

export default async function NewPage({ searchParams }: PageProps) {
  const resolved = searchParams ? await searchParams : undefined;
  const page = getPage(resolved);
  const filters = parseFilters(resolved);
  const active = filtersActive(filters);
  const fetchLimit = active ? 100 : 30;
  const data = await fetchList("new", page - 1, fetchLimit);
  const items = active
    ? applyFilters(data.items, filters).slice(0, 30)
    : data.items;
  const normalized = {
    ...data,
    items,
    limit: 30,
  };

  return (
    <FeedPage list="new" data={normalized} filters={filters} filtersActive={active} />
  );
}
