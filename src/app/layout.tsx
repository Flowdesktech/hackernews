import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import { Box, Container } from "@mui/material";
import "./globals.css";
import ThemeRegistry from "@/components/ThemeRegistry";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Flowdesk HN",
    template: "%s · Flowdesk HN",
  },
  description:
    "Flowdesk HN — a professional Hacker News dashboard with search and local bookmarks.",
};

export const viewport = {
  themeColor: "#0b0f14",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <ThemeRegistry>
          <Header />
          <Box
            sx={{
              minHeight: "100vh",
              background:
                "radial-gradient(circle at top, rgba(255,107,45,0.12), transparent 45%)",
            }}
          >
            <Container maxWidth="lg" sx={{ py: 4 }}>
              {children}
              <Footer />
            </Container>
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}
