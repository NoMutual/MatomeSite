import type { DugaItem, DugaSearchResponse } from "./types.ts";
import { findSampleItem, getSampleItems } from "./sample-works.ts";

const API_BASE = "http://affapi.duga.jp/search";

function hasCreds(): boolean {
  return Boolean(process.env.DUGA_APPID && process.env.DUGA_AGENTID);
}

function getCreds() {
  const appid = process.env.DUGA_APPID;
  const agentid = process.env.DUGA_AGENTID;
  const bannerid = process.env.DUGA_BANNERID ?? "01";
  if (!appid || !agentid) {
    throw new Error(
      "DUGA_APPID / DUGA_AGENTID が未設定です。.env.local を確認してください。",
    );
  }
  return { appid, agentid, bannerid };
}

export type DugaQuery = {
  hits?: number;
  offset?: number;
  sort?: "new" | "release" | "favorite" | "price" | "rating" | "mylist";
  keyword?: string;
  productid?: string;
  /** 素人=01 / 熟女=07 / SM=08 / 女子高生=09 / コスプレ=10 等 */
  category?: string;
  /** ppv / sd / rental / hd / hdrental */
  target?: "ppv" | "sd" | "rental" | "hd" | "hdrental";
};

type ApiResult = {
  items: DugaItem[];
  total: number;
  offset: number;
};

/** DUGA レスポンスを items: DugaItem[] に正規化 */
function normalize(json: DugaSearchResponse): ApiResult {
  const items = (json.items ?? []).map((wrap) => wrap.item);
  return {
    items,
    total: Number(json.count ?? 0),
    offset: Number(json.offset ?? 1),
  };
}

/**
 * 素人カテゴリ (category=01) の作品を検索
 */
export async function fetchAmateurItems(query: DugaQuery = {}): Promise<ApiResult> {
  if (!hasCreds()) {
    const samples = getSampleItems();
    const hits = query.hits ?? 30;
    const offset = Math.max(0, (query.offset ?? 1) - 1);
    const filtered = query.keyword
      ? samples.filter((s) => s.title.includes(query.keyword!))
      : samples;
    return {
      items: filtered.slice(offset, offset + hits),
      total: filtered.length,
      offset: offset + 1,
    };
  }

  const { appid, agentid, bannerid } = getCreds();
  const params = new URLSearchParams({
    version: "1.2",
    appid,
    agentid,
    bannerid,
    format: "json",
    adult: "1",
    category: query.category ?? "01",
    hits: String(query.hits ?? 30),
    offset: String(query.offset ?? 1),
    sort: query.sort ?? "new",
  });
  if (query.keyword) params.set("keyword", query.keyword);
  if (query.productid) params.set("productid", query.productid);
  if (query.target) params.set("target", query.target);

  const url = `${API_BASE}?${params.toString()}`;
  const res = await fetch(url, { next: { revalidate: 60 * 60 * 3 } });
  if (!res.ok) {
    throw new Error(`DUGA API error: ${res.status} ${res.statusText}`);
  }
  const json = (await res.json()) as DugaSearchResponse;
  return normalize(json);
}

/**
 * productid 単体で詳細取得
 */
export async function fetchItemById(productid: string): Promise<DugaItem | null> {
  if (!hasCreds()) {
    return findSampleItem(productid) ?? null;
  }
  const result = await fetchAmateurItems({ productid, hits: 1 });
  return result.items[0] ?? null;
}

/* -------------------- 画像ヘルパー -------------------- */

function pickImage(
  images: Array<{ small?: string; midium?: string; large?: string }> | undefined,
  prefer: "large" | "midium" | "small" = "large",
): string | undefined {
  if (!images) return undefined;
  // 配列の各要素は1つしかキーを持たないので全要素をマージ
  const merged: { small?: string; midium?: string; large?: string } = {};
  for (const obj of images) {
    if (obj.small) merged.small = obj.small;
    if (obj.midium) merged.midium = obj.midium;
    if (obj.large) merged.large = obj.large;
  }
  if (prefer === "large") return merged.large ?? merged.midium ?? merged.small;
  if (prefer === "midium") return merged.midium ?? merged.large ?? merged.small;
  return merged.small ?? merged.midium ?? merged.large;
}

export function getThumbnail(item: DugaItem): string | undefined {
  return pickImage(item.jacketimage, "large") ?? pickImage(item.posterimage, "large");
}

export function getSampleImages(item: DugaItem): string[] {
  return (item.thumbnail ?? []).map((t) => t.image).filter(Boolean);
}

export function getSampleMovieUrl(item: DugaItem): string | undefined {
  const sm = item.samplemovie?.[0];
  return sm?.midium?.movie;
}

export function getAffiliateLink(item: DugaItem): string {
  return item.affiliateurl || item.url;
}

export function getReviewScore(
  item: DugaItem,
): { average: string; count: number } | undefined {
  const r = item.review?.[0];
  if (!r?.score) return undefined;
  return { average: r.score, count: Number(r.count ?? 0) };
}

export function getReleaseDate(item: DugaItem): string {
  const d = item.releasedate ?? item.opendate ?? "";
  return d.replace(/\//g, "-").slice(0, 10);
}
