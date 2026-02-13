"use client";

import {
  AppBar,
  Box,
  Chip,
  Container,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import HeaderSearch from "./HeaderSearch";

const navLinks = [
  { label: "Top", to: "/top" },
  { label: "New", to: "/new" },
  { label: "Best", to: "/best" },
  { label: "Search", to: "/search" },
  { label: "Saved", to: "/saved" },
];

const Header = () => {
  const pathname = usePathname();

  return (
    <AppBar position="sticky" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar sx={{ gap: 2, flexWrap: "wrap", px: 0, py: 1.5 }}>
          <Link href="/top" style={{ textDecoration: "none", color: "inherit" }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="h6" sx={{ fontWeight: 800 }}>
                Flowdesk
              </Typography>
              <Chip
                label="Hacker News"
                size="small"
                color="primary"
                sx={{ fontWeight: 700 }}
              />
            </Stack>
          </Link>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {navLinks.map((link) => {
              const isActive = pathname === link.to;
              return (
                <Link
                  key={link.to}
                  href={link.to}
                  style={{
                    color: "inherit",
                    textDecoration: "none",
                    fontWeight: 600,
                    borderRadius: 999,
                    padding: "6px 14px",
                    border: "1px solid",
                    borderColor: isActive
                      ? "rgba(255,107,45,0.6)"
                      : "transparent",
                    backgroundColor: isActive
                      ? "rgba(255,107,45,0.12)"
                      : "transparent",
                    transition: "all 0.2s ease",
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </Stack>
          <Box marginLeft="auto" display="flex" alignItems="center" gap={2}>
            <HeaderSearch />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
