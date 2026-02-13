import { Box, Divider, Link, Stack, Typography } from "@mui/material";

const Footer = () => (
  <Box component="footer" sx={{ py: 4 }}>
    <Divider sx={{ mb: 3 }} />
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={2}
      justifyContent="space-between"
      alignItems={{ xs: "flex-start", sm: "center" }}
    >
      <Typography variant="body2" color="text.secondary">
        Flowdesk HN · Built with Next.js, MUI, and the HN API
      </Typography>
      <Stack direction="row" spacing={2}>
        <Link href="https://news.ycombinator.com" target="_blank" rel="noreferrer">
          Hacker News
        </Link>
        <Link
          href="https://github.com/Flowdesktech/hackernews"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </Link>
      </Stack>
    </Stack>
  </Box>
);

export default Footer;
