import { Box, Button, Chip, Divider, Paper, Stack, Typography } from "@mui/material";
import PageHeader from "@/components/PageHeader";
import ItemCard from "@/components/ItemCard";
import CommentsSection from "@/components/CommentsSection";
import { fetchItem } from "@/lib/hn";
import { timeAgo } from "@/utils/time";

type PageProps = {
  params?: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const resolved = params ? await params : undefined;
  const decodedId = decodeURIComponent(resolved?.id ?? "");
  const match = decodedId.match(/\d+/);
  const itemId = match ? Number.parseInt(match[0], 10) : NaN;
  if (Number.isNaN(itemId)) {
    return { title: "Story" };
  }
  const item = await fetchItem(itemId);
  return {
    title: item?.title ?? "Story",
    description: item?.title ?? "Hacker News story",
  };
}

export default async function ItemPage({ params }: PageProps) {
  const resolved = params ? await params : undefined;
  const decodedId = decodeURIComponent(resolved?.id ?? "");
  const match = decodedId.match(/\d+/);
  const itemId = match ? Number.parseInt(match[0], 10) : NaN;
  if (Number.isNaN(itemId)) {
    return (
      <Paper variant="outlined" sx={{ p: 4 }}>
        <Stack spacing={2}>
          <Typography variant="h5">Invalid story link</Typography>
          <Typography color="text.secondary">
            This story link looks incorrect. Please choose another item.
          </Typography>
          <Button href="/top" variant="contained">
            Back to top stories
          </Button>
        </Stack>
      </Paper>
    );
  }

  const item = await fetchItem(itemId);
  if (!item) {
    return (
      <Paper variant="outlined" sx={{ p: 4 }}>
        <Stack spacing={2}>
          <Typography variant="h5">Story not available</Typography>
          <Typography color="text.secondary">
            This story may have been removed or is temporarily unavailable.
          </Typography>
          <Button href="/top" variant="contained">
            Back to top stories
          </Button>
        </Stack>
      </Paper>
    );
  }

  return (
    <Stack spacing={3}>
      <PageHeader
        title="Story details"
        subtitle="Read the full discussion and open the source link."
      />
      <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 } }}>
        <Stack spacing={2}>
          <Typography variant="h4">{item.title ?? "Story"}</Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap">
            <Chip label={`${item.score ?? 0} points`} />
            <Chip label={`by ${item.by ?? "unknown"}`} />
            <Chip label={timeAgo(item.time)} />
            {item.url ? (
              <Button href={item.url} target="_blank" rel="noreferrer">
                Open original
              </Button>
            ) : null}
          </Stack>
        </Stack>
      </Paper>
      <Box>
        <ItemCard item={item} />
      </Box>
      <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 } }}>
        <Typography variant="h5" mb={2}>
          Comments
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <CommentsSection itemId={itemId} />
      </Paper>
    </Stack>
  );
}
