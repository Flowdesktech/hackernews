import { Stack } from "@mui/material";
import type { HnListResponse } from "@/types/hn";
import ItemCard from "./ItemCard";
import PageHeader from "./PageHeader";
import PaginationControls from "./PaginationControls";

type FeedPageProps = {
  list: "top" | "new" | "best";
  data: HnListResponse;
};

const FeedPage = ({ list, data }: FeedPageProps) => {
  const pageCount = Math.max(Math.ceil(data.total / data.limit), 1);
  const page = data.page + 1;

  return (
    <Stack spacing={3}>
      <PageHeader
        title={`${list.toUpperCase()} stories`}
        subtitle={
          data.total > 0
            ? `${data.total.toLocaleString()} stories · Page ${page}`
            : `Curated from Hacker News · Page ${page}`
        }
      />
      <Stack spacing={2}>
        {data.items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
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
