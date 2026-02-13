"use client";

import { Button, Paper, Stack, Typography } from "@mui/material";
import Link from "next/link";
import ItemCard from "@/components/ItemCard";
import PageHeader from "@/components/PageHeader";
import { useBookmarks } from "@/hooks/useBookmarks";

const SavedPage = () => {
  const { bookmarks, loading } = useBookmarks();

  if (loading) {
    return <Typography>Loading saved stories...</Typography>;
  }

  return (
    <Stack spacing={3}>
      <PageHeader
        title="Saved stories"
        subtitle="Everything you bookmarked, stored locally in this browser."
      />
      {bookmarks.length === 0 ? (
        <Paper variant="outlined" sx={{ p: 3 }}>
          <Stack spacing={2}>
            <Typography color="text.secondary">
              No saved stories yet. Bookmark a story to see it here.
            </Typography>
            <Button component={Link} href="/top" variant="contained">
              Browse top stories
            </Button>
          </Stack>
        </Paper>
      ) : (
        <Stack spacing={2}>
          {bookmarks.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </Stack>
      )}
    </Stack>
  );
};

export default SavedPage;
