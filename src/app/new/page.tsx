import FeedPage from "@/components/FeedPage";
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
  const data = await fetchList("new", page - 1, 30);
  return <FeedPage list="new" data={data} />;
}
