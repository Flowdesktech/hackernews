"use client";

import { Box, Pagination } from "@mui/material";
import { useRouter } from "next/navigation";

type PaginationControlsProps = {
  page: number;
  pageCount: number;
  basePath: string;
};

const PaginationControls = ({
  page,
  pageCount,
  basePath,
}: PaginationControlsProps) => {
  const router = useRouter();

  if (pageCount <= 1) return null;

  return (
    <Box display="flex" justifyContent="center">
      <Pagination
        count={pageCount}
        page={page}
        onChange={(_event, value) => {
          router.push(`${basePath}?page=${value}`);
        }}
        color="primary"
      />
    </Box>
  );
};

export default PaginationControls;
