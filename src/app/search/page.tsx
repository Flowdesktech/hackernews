import { Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import SearchForm from "@/components/SearchForm";
import SearchPagination from "@/components/SearchPagination";
import { searchHn } from "@/lib/hn";
import { timeAgo } from "@/utils/time";

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

const parsePage = (searchParams?: Record<string, string | string[] | undefined>) => {
  const raw = searchParams?.page;
  const value = Array.isArray(raw) ? raw[0] : raw;
  const parsed = parseInt(value ?? "1", 10);
  return Number.isNaN(parsed) || parsed < 1 ? 1 : parsed;
};

export default async function SearchPage({ searchParams }: PageProps) {
  const resolved = searchParams ? await searchParams : undefined;
  const rawQuery = resolved?.q;
  const query = (Array.isArray(rawQuery) ? rawQuery[0] : rawQuery) ?? "";
  const page = parsePage(resolved);

  const results = query.trim()
    ? await searchHn(query.trim(), page - 1)
    : null;

  return (
    <Stack spacing={3}>
      <PageHeader
        title="Search Hacker News"
        subtitle="Powered by Algolia. Try keywords like “serverless” or “react 19”."
      />
      <SearchForm initialQuery={query} />
      {!query.trim() ? (
        <Typography color="text.secondary">
          Start typing to search across stories and discussions.
        </Typography>
      ) : results ? (
        <Stack spacing={2}>
          {results.hits.map((hit) => (
            <Card key={hit.objectID} variant="outlined">
              <CardContent>
                <Stack spacing={1}>
                  <Typography variant="h6">
                    <Link href={`/item/${hit.objectID}`}>
                      {hit.title ?? "Untitled story"}
                    </Link>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    by {hit.author ?? "unknown"} · {timeAgo(hit.created_at_i)}
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {typeof hit.points === "number" ? (
                      <Chip label={`${hit.points} points`} size="small" />
                    ) : null}
                    {typeof hit.num_comments === "number" ? (
                      <Chip label={`${hit.num_comments} comments`} size="small" />
                    ) : null}
                    {hit.url ? (
                      <Typography variant="body2">
                        <a href={hit.url} target="_blank" rel="noreferrer">
                          {hit.url}
                        </a>
                      </Typography>
                    ) : null}
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          ))}
          <SearchPagination
            page={page}
            pageCount={results.nbPages}
            query={query}
          />
          {results.nbHits > 0 ? (
            <Typography variant="caption" color="text.secondary">
              {results.nbHits.toLocaleString()} results
            </Typography>
          ) : null}
        </Stack>
      ) : null}
    </Stack>
  );
}
