"use client";

import { useEffect, useMemo, useState } from "react";
import type { BookmarkItem, HnItem } from "@/types/hn";

const STORAGE_KEY = "flowdesk_bookmarks";

const loadBookmarks = (): BookmarkItem[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as BookmarkItem[];
    if (!Array.isArray(parsed)) return [];
    return [...parsed].sort(
      (a, b) => (b.savedAt ?? 0) - (a.savedAt ?? 0)
    );
  } catch {
    return [];
  }
};

const persistBookmarks = (items: BookmarkItem[]) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setBookmarks(loadBookmarks());
    setLoading(false);

    const handleStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) {
        setBookmarks(loadBookmarks());
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const saveBookmark = async (item: HnItem) => {
    setBookmarks((prev) => {
      const exists = prev.some((bookmark) => bookmark.id === item.id);
      if (exists) return prev;
      const next = [
        {
          id: item.id,
          title: item.title ?? "",
          url: item.url ?? "",
          by: item.by ?? "",
          time: item.time ?? 0,
          score: item.score ?? 0,
          type: item.type ?? "story",
          savedAt: Date.now(),
        },
        ...prev,
      ];
      persistBookmarks(next);
      return next;
    });
  };

  const removeBookmark = async (id: number) => {
    setBookmarks((prev) => {
      const next = prev.filter((bookmark) => bookmark.id !== id);
      persistBookmarks(next);
      return next;
    });
  };

  const isBookmarked = useMemo(
    () => (id: number) => bookmarks.some((item) => item.id === id),
    [bookmarks]
  );

  return {
    bookmarks,
    loading,
    saveBookmark,
    removeBookmark,
    isBookmarked,
  };
};
