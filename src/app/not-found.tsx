"use client";

import { Button, Paper, Stack } from "@mui/material";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";

export default function NotFound() {
  return (
    <Paper variant="outlined" sx={{ p: 4 }}>
      <Stack spacing={2}>
        <PageHeader
          title="Page not found"
          subtitle="The page you are looking for does not exist."
        />
        <Button component={Link} href="/top" variant="contained">
          Go to top stories
        </Button>
      </Stack>
    </Paper>
  );
}
