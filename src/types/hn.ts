export type HnItem = {
  id: number;
  deleted?: boolean;
  type?: string;
  by?: string;
  time?: number;
  text?: string;
  dead?: boolean;
  parent?: number;
  poll?: number;
  kids?: number[] | HnItem[];
  url?: string;
  score?: number;
  title?: string;
  parts?: number[];
  descendants?: number;
};

export type HnListResponse = {
  list: string;
  page: number;
  limit: number;
  total: number;
  items: HnItem[];
};

export type AlgoliaHit = {
  objectID: string;
  title?: string;
  url?: string;
  author?: string;
  created_at_i?: number;
  points?: number;
  num_comments?: number;
};

export type AlgoliaResponse = {
  hits: AlgoliaHit[];
  page: number;
  nbPages: number;
  nbHits: number;
};

export type BookmarkItem = {
  id: number;
  title?: string;
  url?: string;
  by?: string;
  time?: number;
  score?: number;
  type?: string;
  savedAt?: number;
};
