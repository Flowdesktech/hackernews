import type { ReactNode } from "react";
import { Box, Stack, Typography } from "@mui/material";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
};

const PageHeader = ({ title, subtitle, actions }: PageHeaderProps) => (
  <Stack
    spacing={1}
    direction={{ xs: "column", md: "row" }}
    alignItems={{ xs: "flex-start", md: "center" }}
    justifyContent="space-between"
  >
    <Box>
      <Typography variant="h4">{title}</Typography>
      {subtitle ? (
        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>
      ) : null}
    </Box>
    {actions ? <Box>{actions}</Box> : null}
  </Stack>
);

export default PageHeader;
