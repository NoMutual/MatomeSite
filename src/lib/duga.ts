import type { DugaItem } from "./types.ts";

/**
 * Cloudflare Workers は HTTP (DUGA API は HTTP のみ) fetch が不安定なため、
 * 実ランタイムでは API を直接叩かず data/work-tags.json の静的データを返す。
 * データ更新は ローカルで `npm run tag` → commit → デプロイ の流れ。
 */

export type DugaQuery = {
  hits?: number;
  offset?: number;
  sort?: "new" | "release" | "favorite" | "price" | "rating" | "mylist";
  keyword?: string;
  productid?: string;
  category?: string;
  target?: "ppv" | "sd" | "rental" | "hd" | "hdrental";
};

type ApiResult = {
  items: DugaItem[];
  total: number;
  offset: number;
};

/**
 * 素人カテゴリ作品を検索（ローカルデータから）
 */
export async function fetchAmateurItems(query: DugaQuery = {}): Promise<ApiResult> {
  const { getAllItems } = await import("./work-tags-store.ts");
  const all = getAllItems();

  // キーワードフィルタ
  let filtered = all;
  if (query.keyword) {
    const kw = query.keyword;
    filtered = all.filter(
      (i) => i.title.includes(kw) || (i.caption ?? "").includes(kw),
    );
  }

  // ソート
  if (query.sort === "rating") {
    filtered.sort((a, b) => {
      const ra = parseFloat(a.review?.[0]?.score ?? "0");
      const rb = parseFloat(b.review?.[0]?.score ?? "0");
      return rb - ra;
    });
  } else if (query.sort === "favorite") {
    filtered.sort((a, b) => {
      const ra = parseInt(a.ranking?.[0]?.total?.replace(/,/g, "") ?? "0");
      const rb = parseInt(b.ranking?.[0]?.total?.replace(/,/g, "") ?? "0");
      return rb - ra;
    });
  }
  // default は生成時の新着順（getAllItems がすでに date desc）

  const hits = query.hits ?? 30;
  const offset = Math.max(0, (query.offset ?? 1) - 1);
  return {
    items: filtered.slice(offset, offset + hits),
    total: filtered.length,
    offset: offset + 1,
  };
}

/**
 * productid で単体取得
 */
export async function fetchItemById(productid: string): Promise<DugaItem | null> {
  const { getFullItem } = await import("./work-tags-store.ts");
  return getFullItem(productid) ?? null;
}

/* -------------------- 画像ヘルパー -------------------- */

function pickImage(
  images: Array<{ small?: string; midium?: string; large?: string }> | undefined,
  prefer: "large" | "midium" | "small" = "large",
): string | undefined {
  if (!images) return undefined;
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
