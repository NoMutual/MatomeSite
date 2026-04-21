/**
 * DUGA Web Service API の商品データ型
 * レスポンス形式: { items: [{ item: DugaItem }, ...] }
 */
export type DugaItem = {
  productid: string;
  title: string;
  caption?: string;
  makername?: string;
  url: string;
  affiliateurl: string;
  opendate?: string;
  releasedate?: string;
  itemno?: string;
  price?: string;
  volume?: number;
  /** 画像配列は [{small: url}, {midium: url}, {large: url}] の形 */
  posterimage?: Array<{ small?: string; midium?: string; large?: string }>;
  jacketimage?: Array<{ small?: string; midium?: string; large?: string }>;
  thumbnail?: Array<{ image: string }>;
  samplemovie?: Array<{
    midium?: { movie: string; capture: string };
  }>;
  label?: Array<{ id: string; name: string; number?: string }>;
  category?: Array<{ data: { id: string; name: string } }>;
  series?: Array<{ id: number; name: string }>;
  performer?: Array<{ id: number; name: string }>;
  director?: Array<{ id: number; name: string }>;
  saletype?: Array<{ data: { type: string; price: string } }>;
  review?: Array<{ score?: string; count?: string }>;
  ranking?: Array<{ total: string }>;
  mylist?: Array<{ total: string }>;
};

export type DugaSearchResponse = {
  hits: string;
  count: number;
  offset: number;
  timestamp: string;
  items: Array<{ item: DugaItem }>;
};

export type TagCategory = "girl_type" | "situation" | "shooting_style" | "place_mood";

export type Tag = {
  slug: string;
  label: string;
  category: TagCategory;
  subcategory?: string;
  aliases?: string[];
  /** タグページの SEO 用説明文（100〜200字） */
  description?: string;
};
