"use client";

import { Box, Divider, Typography } from "@mui/material";
import type { HnItem } from "@/types/hn";
import { timeAgo } from "@/utils/time";

type CommentTreeProps = {
  comments?: HnItem[] | number[];
  depth?: number;
};

const CommentTree = ({ comments, depth = 0 }: CommentTreeProps) => {
  if (!comments || comments.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary">
        No comments yet.
      </Typography>
    );
  }

  if (typeof comments[0] === "number") {
    return (
      <Typography variant="body2" color="text.secondary">
        Comments are still loading.
      </Typography>
    );
  }

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {(comments as HnItem[]).map((comment) => (
        <Box key={comment.id}>
          <Box
            pl={2}
            borderLeft="2px solid"
            borderColor="divider"
            bgcolor={depth % 2 === 0 ? "background.paper" : "background.default"}
          >
            <Typography variant="caption" color="text.secondary">
              {comment.by ?? "unknown"} · {timeAgo(comment.time)}
            </Typography>
            {comment.text ? (
              <Typography
                variant="body2"
                component="div"
                sx={{ mt: 1 }}
                dangerouslySetInnerHTML={{ __html: comment.text }}
              />
            ) : (
              <Typography variant="body2" color="text.secondary">
                Comment deleted.
              </Typography>
            )}
          </Box>
          {Array.isArray(comment.kids) && comment.kids.length > 0 ? (
            <Box pl={2} mt={2}>
              <CommentTree comments={comment.kids as HnItem[]} depth={depth + 1} />
            </Box>
          ) : null}
          <Divider sx={{ mt: 2 }} />
        </Box>
      ))}
    </Box>
  );
};

export default CommentTree;
