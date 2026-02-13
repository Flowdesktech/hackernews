"use client";

import { Box, Pagination } from "@mui/material";
import { useRouter } from "next/navigation";

type SearchPaginationProps = {
  page: number;
  pageCount: number;
  query: string;
};

const SearchPagination = ({ page, pageCount, query }: SearchPaginationProps) => {
  const router = useRouter();

  if (pageCount <= 1) return null;

  return (
    <Box display="flex" justifyContent="center">
      <Pagination
        count={pageCount}
        page={page}
        onChange={(_event, value) => {
          router.push(`/search?q=${encodeURIComponent(query)}&page=${value}`);
        }}
        color="primary"
      />
    </Box>
  );
};

export default SearchPagination;
