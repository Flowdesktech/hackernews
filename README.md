# Flowdesk HN

Production‑ready Hacker News dashboard built with Next.js + MUI.

## Features

- SSR pages for `/top`, `/new`, `/best`, `/search`, and `/item/:id`
- Fast item view with comments loaded on demand
- Local bookmarks (stored in browser)
- Clean, professional UI with avatars, responsive layout, and polished typography
- Search powered by Algolia HN API (Enter to submit)

## Tech Stack

- Next.js App Router
- React 19 + TypeScript
- Material UI (MUI)
- Hacker News + Algolia APIs

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — start dev server (webpack)
- `npm run build` — production build
- `npm run start` — run production server
- `npm run lint` — run ESLint

## Notes

- Bookmarks are stored locally in your browser (no sign‑in required).
- Comments are fetched separately to keep item pages fast.

## Repo

https://github.com/Flowdesktech/hackernews
