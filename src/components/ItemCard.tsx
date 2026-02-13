"use client";

import {
  Avatar,
  Card,
  CardContent,
  Chip,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import StarIcon from "@mui/icons-material/Star";
import NextLink from "next/link";
import type { HnItem } from "@/types/hn";
import { timeAgo } from "@/utils/time";
import { useBookmarks } from "@/hooks/useBookmarks";

type ItemCardProps = {
  item: HnItem;
};

const getHost = (url?: string) => {
  if (!url) return null;
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return null;
  }
};

const stringToColor = (value: string) => {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = value.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = Math.abs(hash).toString(16).padStart(6, "0").slice(0, 6);
  return `#${color}`;
};

const ItemCard = ({ item }: ItemCardProps) => {
  const { isBookmarked, saveBookmark, removeBookmark } = useBookmarks();
  const bookmarked = isBookmarked(item.id);
  const host = getHost(item.url);
  const author = item.by ?? "HN";
  const score = item.score ?? 0;
  const commentsCount = item.descendants ?? 0;
  const isHot = score >= 150 && commentsCount >= 60;
  const isTrending = score >= 80 && commentsCount >= 30;
  const isPopular = score >= 200 || commentsCount >= 120;
  const badges = [
    isHot
      ? {
          label: "Hot discussion",
          color: "primary" as const,
          icon: <WhatshotIcon fontSize="small" />,
        }
      : null,
    isTrending
      ? {
          label: "Trending",
          color: "secondary" as const,
          icon: <TrendingUpIcon fontSize="small" />,
        }
      : null,
    isPopular
      ? {
          label: "Popular",
          variant: "outlined" as const,
          icon: <StarIcon fontSize="small" />,
        }
      : null,
  ].filter(Boolean) as Array<{
    label: string;
    color?: "primary" | "secondary";
    variant?: "outlined";
    icon: React.ReactElement;
  }>;

  const toggleBookmark = async () => {
    if (bookmarked) {
      await removeBookmark(item.id);
    } else {
      await saveBookmark(item);
    }
  };

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 2,
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 16px 30px rgba(0,0,0,0.25)",
          borderColor: "rgba(255,255,255,0.16)",
        },
      }}
    >
      <CardContent sx={{ px: 2.5, py: 2 }}>
        <Stack direction="row" spacing={2} alignItems="flex-start">
          <Avatar
            sx={{
              width: 66,
              height: 66,
              fontSize: "1.6rem",
              bgcolor: stringToColor(author),
              color: "#ffffff",
              flexShrink: 0,
            }}
          >
            {author.slice(0, 1).toUpperCase()}
          </Avatar>
          <Stack spacing={0.75} flex={1} minWidth={0}>
            <Link
              component={NextLink}
              href={`/item/${item.id}`}
              underline="hover"
              color="inherit"
              sx={{
                fontWeight: 700,
                fontSize: "1.08rem",
                lineHeight: 1.35,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {item.title ?? "Untitled story"}
            </Link>
            <Typography variant="body2" color="text.secondary">
              {author}
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {host ? (
                <Typography variant="caption" color="text.secondary">
                  {host}
                </Typography>
              ) : null}
              <Typography variant="caption" color="text.secondary">
                {timeAgo(item.time)}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              <Chip label={`${item.score ?? 0} points`} size="small" />
              {typeof item.descendants === "number" ? (
                <Chip label={`${item.descendants} comments`} size="small" />
              ) : null}
            </Stack>
            <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap">
              {item.url ? (
                <Link
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  sx={{ display: "inline-flex", alignItems: "center", gap: 0.5 }}
                >
                  Open link <OpenInNewIcon fontSize="inherit" />
                </Link>
              ) : null}
              <Stack direction="row" spacing={1} alignItems="center">
                <IconButton
                  onClick={toggleBookmark}
                  aria-label={bookmarked ? "Remove bookmark" : "Save bookmark"}
                  size="small"
                >
                  {bookmarked ? <BookmarkRemoveIcon /> : <BookmarkAddIcon />}
                </IconButton>
                <Typography variant="caption" color="text.secondary">
                  {bookmarked ? "Saved to bookmarks" : "Save to bookmarks"}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          {badges.length > 0 ? (
            <Stack
              spacing={1}
              alignItems="flex-end"
              sx={{ minWidth: 140, pt: 0.5 }}
            >
              {badges.map((badge) => (
                <Chip
                  key={badge.label}
                  label={badge.label}
                  color={badge.color}
                  variant={badge.variant ?? "filled"}
                  size="small"
                  icon={badge.icon}
                />
              ))}
            </Stack>
          ) : null}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ItemCard;
