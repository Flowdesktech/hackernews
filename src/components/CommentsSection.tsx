"use client";

import { useEffect, useRef, useState } from "react";
import { Box, Button, Skeleton, Stack, Typography } from "@mui/material";
import CommentTree from "./CommentTree";
import type { HnItem } from "@/types/hn";

const DEFAULT_COMMENT_DEPTH = 2;
const DEFAULT_COMMENT_LIMIT = 30;

type CommentsSectionProps = {
  itemId: number;
};

const CommentsSection = ({ itemId }: CommentsSectionProps) => {
  const [comments, setComments] = useState<HnItem[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [depth, setDepth] = useState(DEFAULT_COMMENT_DEPTH);
  const [limit, setLimit] = useState(DEFAULT_COMMENT_LIMIT);
  const requestIdRef = useRef(0);

  const loadComments = async (nextDepth: number, nextLimit: number) => {
    const requestId = ++requestIdRef.current;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `/api/item/${itemId}?depth=${nextDepth}&limit=${nextLimit}`
      );
      if (!response.ok) {
        throw new Error("Failed to load comments");
      }
      const data = (await response.json()) as HnItem;
      if (requestIdRef.current !== requestId) return;
      setComments(Array.isArray(data.kids) ? (data.kids as HnItem[]) : []);
    } catch (err) {
      if (requestIdRef.current !== requestId) return;
      setError((err as Error).message);
    } finally {
      if (requestIdRef.current === requestId) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    setComments(null);
    setDepth(DEFAULT_COMMENT_DEPTH);
    setLimit(DEFAULT_COMMENT_LIMIT);
    loadComments(DEFAULT_COMMENT_DEPTH, DEFAULT_COMMENT_LIMIT);
  }, [itemId]);

  if (loading && !comments) {
    return (
      <Stack spacing={2}>
        {Array.from({ length: 4 }).map((_, index) => (
          <Box key={`comment-skeleton-${index}`}>
            <Skeleton variant="text" height={18} width="30%" />
            <Skeleton variant="text" height={16} width="90%" />
            <Skeleton variant="text" height={16} width="70%" />
          </Box>
        ))}
      </Stack>
    );
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <>
      <CommentTree comments={comments ?? []} />
      <Box display="flex" gap={2} mt={2} alignItems="center">
        <Typography variant="caption" color="text.secondary">
          Showing depth {depth} · Limit {limit}
        </Typography>
        <Button
          variant="outlined"
          size="small"
          onClick={() => {
            const nextDepth = Math.min(depth + 1, 4);
            const nextLimit = Math.min(limit + 30, 300);
            setDepth(nextDepth);
            setLimit(nextLimit);
            loadComments(nextDepth, nextLimit);
          }}
          disabled={loading}
        >
          Load more comments
        </Button>
        {loading ? (
          <Typography variant="caption" color="text.secondary">
            Loading more...
          </Typography>
        ) : null}
      </Box>
    </>
  );
};

export default CommentsSection;
