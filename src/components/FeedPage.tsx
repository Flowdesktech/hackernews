import { Stack, Typography } from "@mui/material";
import type { HnListResponse } from "@/types/hn";
import type { Filters } from "@/lib/filters";
import ItemCard from "./ItemCard";
import PageHeader from "./PageHeader";
import PaginationControls from "./PaginationControls";
import FilterBar from "./FilterBar";

type FeedPageProps = {
  list: "top" | "new" | "best";
  data: HnListResponse;
  filters: Filters;
  filtersActive: boolean;
};

const FeedPage = ({ list, data, filters, filtersActive }: FeedPageProps) => {
  const pageCount = filtersActive
    ? 1
    : Math.max(Math.ceil(data.total / data.limit), 1);
  const page = data.page + 1;
  const showingCount = data.items.length;

  return (
    <Stack spacing={3}>
      <PageHeader
        title={`${list.toUpperCase()} stories`}
        subtitle={
          filtersActive
            ? `Filtered results · ${showingCount} shown · Page ${page}`
            : data.total > 0
              ? `${data.total.toLocaleString()} stories · Page ${page}`
              : `Curated from Hacker News · Page ${page}`
        }
      />
      <FilterBar
        basePath={`/${list}`}
        filters={filters}
        active={filtersActive}
      />
      <Stack spacing={2}>
        {data.items.length > 0 ? (
          data.items.map((item) => <ItemCard key={item.id} item={item} />)
        ) : (
          <Typography color="text.secondary">
            No stories match the current filters.
          </Typography>
        )}
      </Stack>
      <PaginationControls
        page={page}
        pageCount={pageCount}
        basePath={`/${list}`}
      />
    </Stack>
  );
};

export default FeedPage;
