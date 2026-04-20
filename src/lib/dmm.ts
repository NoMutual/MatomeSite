import type { DmmItem, DmmItemListResponse } from "./types";
import { findSampleItem, getSampleItems } from "./sample-works";

const API_BASE = "https://api.dmm.com/affiliate/v3/ItemList";

function hasCreds(): boolean {
  return Boolean(process.env.DMM_API_ID && process.env.DMM_AFFILIATE_ID);
}

export type DmmQuery = {
  hits?: number;
  offset?: number;
  sort?: "rank" | "price" | "-price" | "date" | "review";
  keyword?: string;
  cid?: string;
  article?: "genre" | "actress" | "maker" | "series";
  article_id?: string;
};

function getCreds() {
  const api_id = process.env.DMM_API_ID;
  const affiliate_id = process.env.DMM_AFFILIATE_ID;
  if (!api_id || !affiliate_id) {
    throw new Error(
      "DMM_API_ID / DMM_AFFILIATE_ID が未設定です。.env.local を確認してください。",
    );
  }
  return { api_id, affiliate_id };
}

export async function fetchAmateurItems(
  query: DmmQuery = {},
): Promise<DmmItemListResponse["result"]> {
  // APIキーが無い時はサンプルデータにフォールバック
  if (!hasCreds()) {
    const samples = getSampleItems();
    const hits = query.hits ?? 30;
    const offset = Math.max(0, (query.offset ?? 1) - 1);
    const sliced = query.keyword
      ? samples.filter((s) => s.title.includes(query.keyword!))
      : samples;
    return {
      status: 200,
      result_count: Math.min(sliced.length - offset, hits),
      total_count: sliced.length,
      first_position: offset + 1,
      items: sliced.slice(offset, offset + hits),
    };
  }

  const { api_id, affiliate_id } = getCreds();
  const params = new URLSearchParams({
    api_id,
    affiliate_id,
    site: "FANZA",
    service: "digital",
    floor: "videoc",
    output: "json",
    hits: String(query.hits ?? 30),
    offset: String(query.offset ?? 1),
    sort: query.sort ?? "date",
  });
  if (query.keyword) params.set("keyword", query.keyword);
  if (query.cid) params.set("cid", query.cid);
  if (query.article && query.article_id) {
    params.set("article", query.article);
    params.set("article_id", query.article_id);
  }

  const url = `${API_BASE}?${params.toString()}`;
  const res = await fetch(url, {
    next: { revalidate: 60 * 60 * 6 },
  });
  if (!res.ok) {
    throw new Error(`DMM API error: ${res.status} ${res.statusText}`);
  }
  const json = (await res.json()) as DmmItemListResponse;
  return json.result;
}

export async function fetchItemByCid(cid: string): Promise<DmmItem | null> {
  if (!hasCreds()) {
    return findSampleItem(cid) ?? null;
  }
  const result = await fetchAmateurItems({ cid, hits: 1 });
  return result.items[0] ?? null;
}

export function getThumbnail(item: DmmItem): string | undefined {
  return item.imageURL?.large ?? item.imageURL?.list ?? item.imageURL?.small;
}

export function getSampleImages(item: DmmItem): string[] {
  return (
    item.sampleImageURL?.sample_l?.image ?? item.sampleImageURL?.sample_s?.image ?? []
  );
}
