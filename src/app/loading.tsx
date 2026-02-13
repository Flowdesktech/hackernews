import { Box, CircularProgress, Paper, Skeleton, Stack, Typography } from "@mui/material";

export default function Loading() {
  return (
    <Stack spacing={3}>
      <Paper variant="outlined" sx={{ p: 3 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <CircularProgress size={28} thickness={5} />
          <Box>
            <Typography variant="h6">Loading</Typography>
            <Typography variant="body2" color="text.secondary">
              Fetching the latest stories...
            </Typography>
          </Box>
        </Stack>
      </Paper>
      <Stack spacing={2}>
        {Array.from({ length: 6 }).map((_, index) => (
          <Box
            key={`skeleton-${index}`}
            border="1px solid"
            borderColor="divider"
            borderRadius={2}
            p={2}
          >
            <Skeleton variant="text" height={28} width="80%" />
            <Skeleton variant="text" height={18} width="40%" />
            <Stack direction="row" spacing={1} mt={1}>
              <Skeleton variant="rounded" width={90} height={24} />
              <Skeleton variant="rounded" width={110} height={24} />
              <Skeleton variant="rounded" width={100} height={24} />
            </Stack>
          </Box>
        ))}
      </Stack>
    </Stack>
  );
}
