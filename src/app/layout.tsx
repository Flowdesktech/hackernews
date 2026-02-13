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
  applicationName: "Flowdesk HN",
  authors: [{ name: "Flowdesktech", url: "https://github.com/Flowdesktech" }],
  creator: "Flowdesktech",
  publisher: "Flowdesktech",
  category: "News",
  keywords: [
    "Hacker News",
    "Tech News",
    "Startup News",
    "Developer News",
    "Flowdesk",
  ],
  metadataBase: new URL("https://flowdesk-hn.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://flowdesk-hn.vercel.app",
    title: "Flowdesk HN",
    description:
      "A professional Hacker News dashboard with search, filters, and local bookmarks.",
    siteName: "Flowdesk HN",
    images: [
      {
        url: "/logo.svg",
        width: 120,
        height: 120,
        alt: "Flowdesk HN logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flowdesk HN",
    description:
      "A professional Hacker News dashboard with search, filters, and local bookmarks.",
    images: ["/logo.svg"],
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: ["/favicon.svg"],
    apple: [{ url: "/logo.svg", type: "image/svg+xml" }],
  },
  robots: {
    index: true,
    follow: true,
  },
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
